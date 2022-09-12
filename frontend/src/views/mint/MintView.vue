<template>
  <div class="transition-colors duration-200 bg-white dark:bg-neutral-900">
    <MamoViewHeader variant="crimson">
      <h1 class="text-4xl font-bold text-center">
        <template v-if="presaleEnabled">Sale not open</template>
        <template v-else
          >Create your <MamoLogoIcon class="!text-4xl" />
        </template>
      </h1>
    </MamoViewHeader>

    <div v-if="!presaleEnabled">
      <div class="container max-w-4xl py-8 mx-auto lg:px-8">
        <MamoStepper v-model="step">
          <MamoStepperItem title="Select quantity" v-bind="task(0, 0)">
            <template v-slot="{ index }">
              <MintStep :isActive="taskIndex >= index">
                <template v-slot:description>
                  Please adjust the number of Magic Mondrian NFT's you want to
                  own.
                </template>
                <QuantityTask
                  :disabled="task(0, 0).isReady.value"
                  @submit="next"
                />
              </MintStep>
            </template>
          </MamoStepperItem>

          <MamoStepperItem
            v-if="whitelistEnabled"
            title="Voucher"
            v-bind="task(0, 1)"
          >
            <template v-slot="{ index }">
              <MintStep :isActive="taskIndex >= index">
                <template v-slot:description>
                  Granting access to the whitelist sale, if you are eligible.
                </template>
              </MintStep>
            </template>
          </MamoStepperItem>

          <MamoStepperItem
            title="Mint"
            v-bind="task(0, whitelistEnabled ? 2 : 1)"
          >
            <template v-slot="{ index }">
              <MintStep :isActive="taskIndex >= index">
                <template v-slot:description>
                  Please confirm the transaction to create your own Magic
                  Mondrian NFT(s).
                </template>
              </MintStep>
            </template>
          </MamoStepperItem>

          <MamoStepperItem
            title="Load NFT"
            v-bind="task(0, whitelistEnabled ? 3 : 2)"
          >
            <template v-slot="{ index }">
              <MintStep :isActive="taskIndex >= index">
                <template v-slot:description>
                  Receiving your NFT(s). This may take some time, depending on
                  the current network traffic.
                </template>
              </MintStep>
            </template>
          </MamoStepperItem>

          <MamoStepperItem
            title="Event Invitation"
            v-if="whitelistEnabled"
            v-bind="task(1, 0)"
          >
            <template v-slot="{ index }">
              <MintStep :isActive="taskIndex >= index">
                <template v-slot:description>
                  {{ MintDescription.event }} You may request this invitation at
                  a later point in time in your user profile
                </template>

                <MamoEventForm
                  :disabled="
                    task(1, 0).isReady.value || taskIndex.value < index
                  "
                  :loading="task(1, 0).isLoading.value"
                  @submit="next($event, { job: 1, task: index })"
                  @skip="skip({ job: 1, task: index })"
                />
              </MintStep>
            </template>
          </MamoStepperItem>

          <MamoStepperItem
            title="Print NFT"
            v-bind="task(whitelistEnabled ? 2 : 1, 0)"
          >
            <template v-slot="{ index }">
              <MintStep :isActive="taskIndex >= index">
                <template v-slot:description>
                  {{ MintDescription.print }}
                  You may issue more print orders at a later point in time in
                  your user profile.
                </template>
                <MamoPrintForm
                  :tokens="tokens"
                  :disabled="
                    task(whitelistEnabled ? 2 : 1, 0).isReady.value ||
                    taskIndex.value < index
                  "
                  @submit="
                    next($event, { job: whitelistEnabled ? 2 : 1, task: index })
                  "
                  @skip="skip({ job: whitelistEnabled ? 2 : 1, task: index })"
                />
              </MintStep>
            </template>
          </MamoStepperItem>

          <MamoStepperItem
            title="Print payment"
            v-bind="task(whitelistEnabled ? 2 : 1, 1)"
          >
            <template v-slot="{ index }">
              <MintStep :isActive="taskIndex >= index">
                <template v-slot:description
                  >Please confirm the transaction for the payment of your print
                  order. You won't be charged any other fees.</template
                >
              </MintStep>
            </template>
          </MamoStepperItem>

          <MamoStepperItem
            title="Print order"
            v-bind="task(whitelistEnabled ? 2 : 1, 2)"
          >
            <template v-slot="{ index }">
              <MintStep :isActive="taskIndex >= index">
                <template v-slot:description>
                  Processing of your print order. We will send a confirmation
                  message to your inbox.</template
                >
              </MintStep>
            </template>
          </MamoStepperItem>

          <MamoStepperItem title="Confirmation">
            <MintStep :isActive="finishedTasks.mint">
              <template v-slot:description
                >Enjoy your newly created Magic Mondrian NFT(s). The following
                tasks have been completed:</template
              >
              <ConfirmationTask :finishedTasks="finishedTasks" />
            </MintStep>
          </MamoStepperItem>
        </MamoStepper>
      </div>

      <MamoTransactionModal
        v-model="showMintTransactionModal"
        task="Mint NFT"
        :price="mintPrice"
      />

      <MamoTransactionModal
        v-model="showPrintTransactionModal"
        task="Print NFT"
        :price="printPrice"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive, computed, unref } from "vue";
import { ethers } from "ethers";
import { notify } from "notiwind";
import { useHead } from "@vueuse/head";
import { useWallet } from "@whitelabel-solutions/wallet-connector-vue";
import printService from "@/services/print";
import saleService, { GetVoucherResponse } from "@/services/sale";
import useAsyncTasksCycle from "@/composables/useAsyncTasksCycle";
import { Price, SalePhase, MintDescription } from "@/utils/constants";
import { useFlag } from "@/composables/useFlags";
import QuantityTask from "@/views/mint/components/QuantityTask.vue";
import MintStep from "@/views/mint/components/MintStep.vue";
import ConfirmationTask from "@/views/mint/components/ConfirmationTask.vue";
import { MamoEventForm } from "@/components/EventForm";
import { MamoPrintForm } from "@/components/PrintForm";
import { MamoStepper, MamoStepperItem } from "@/components/Stepper";
import { MamoTransactionModal } from "@/components/WalletModal";
import { MamoLogoIcon } from "@/components/Icon";
import { MamoViewHeader } from "@/components/ViewHeader";
import { useContract } from "@/composables/useContract";

const whitelistEnabled = useFlag(SalePhase.WhitelistSale);
const presaleEnabled = useFlag(SalePhase.PreSale);
const { address } = useWallet();

useHead({
  title: "Mint",
});

const contract = useContract();

const mintPrice = computed(() => {
  const price = whitelistEnabled.value ? Price.whitelist : Price.default;
  return mintQuantity.value * Number(price);
});

const mintQuantity = ref(1);
const tokens = ref([]);
const step = ref(0);
const showMintTransactionModal = ref(false);
const showPrintTransactionModal = ref(false);
const finishedTasks = reactive({
  mint: false,
  getTokens: false,
  sendTicket: false,
  print: false,
});

const setQuantity = (quantity: number) => {
  mintQuantity.value = quantity;
  return {
    quantity: quantity,
    price: String(mintPrice.value),
  };
};

const getVoucher = async function (mintData: {
  quantity: number;
  price: string;
}) {
  const { data, error } = await saleService.getVoucher();
  if (error.value) {
    throw new Error(error.value);
  }
  const { signature } = unref(data) as GetVoucherResponse;
  return { ...mintData, signature };
};

const mint = async function (mintData: any) {
  showMintTransactionModal.value = true;
  let tx = null;
  try {
    tx = await contract.mint(mintData, { txWait: false });
  } finally {
    showMintTransactionModal.value = false;
  }
  const receipt = await tx?.wait();
  finishedTasks.mint = true;
  return receipt;
};

const getTokens = async function (tx: ethers.ContractReceipt) {
  const { data, error } = await saleService.getTokensFromTx(address.value, tx);
  if (error.value) {
    throw new Error(error.value);
  }
  tokens.value = data.value.data.tokens;
  finishedTasks.getTokens = true;
};

const sendTicket = async function (email: string) {
  await saleService.sendEventInvitation({ email });
  finishedTasks.sendTicket = true;
};

const setPrintData = (printData: any) => printData;

const sendPrintPayment = async (printData: any) => {
  showPrintTransactionModal.value = true;
  let tx = null;
  try {
    tx = await contract.print(
      {
        token: printData.token,
        address: address.value,
      },
      { txWait: false }
    );
  } finally {
    showPrintTransactionModal.value = false;
  }
  await tx?.wait();
  return printData;
};

const sendPrintOrder = async (printData: any) => {
  await printService.send(printData);
  finishedTasks.print = true;
  // printedTokens.value.push(printData.token.id);
};

const printPrice = Price.print;

const tasks: any[] = [
  whitelistEnabled.value
    ? [setQuantity, getVoucher, mint, getTokens]
    : [setQuantity, mint, getTokens],
];
whitelistEnabled.value && tasks.push([sendTicket]);
tasks.push([setPrintData, sendPrintPayment, sendPrintOrder]);

const { skip, next, jobs, taskIndex, isError } = useAsyncTasksCycle(...tasks);

watch(taskIndex, () => {
  step.value = taskIndex.value;
});

watch(isError, () => {
  if (isError.value) {
    notify({
      group: "app",
      type: "error",
      title: "Something went wrong",
    });
  }
});

const task = (job: number, task: number) => {
  const { isLoading, isReady, error } = jobs[job][task];
  return { isLoading, isReady, error };
};
</script>
