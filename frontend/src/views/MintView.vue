<template>
  <div class="transition-colors duration-200 bg-white dark:bg-neutral-900">
    <div
      class="pb-8 transition-colors duration-200 pt-28 text-neutral-50 bg-crimson-500 dark:bg-crimson-800 mondrian-border-b bg-hero-pattern-charlie"
    >
      <div class="container px-8 mx-auto">
        <div class="py-24">
          <h1 class="text-4xl font-bold leading-relaxed text-center">
            <span class="">{{
              presaleEnabled ? "Sale not open" : "Create your"
            }}</span>
            <LogoIcon class="!text-4xl" v-if="!presaleEnabled" />
          </h1>
        </div>
      </div>
    </div>

    <div v-if="!presaleEnabled">
      <div class="container max-w-4xl py-8 mx-auto lg:px-8">
        <StepperContainer v-model="step">
          <StepperItem title="Select quantity" v-bind="task(0, 0)">
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
          </StepperItem>

          <StepperItem
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
          </StepperItem>

          <StepperItem title="Mint" v-bind="task(0, whitelistEnabled ? 2 : 1)">
            <template v-slot="{ index }">
              <MintStep :isActive="taskIndex >= index">
                <template v-slot:description>
                  Please confirm the transaction to create your own Magic
                  Mondrian NFT(s).
                </template>
              </MintStep>
            </template>
          </StepperItem>

          <StepperItem
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
          </StepperItem>

          <StepperItem
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

                <TicketTask
                  :disabled="
                    task(1, 0).isReady.value || taskIndex.value < index
                  "
                  :loading="task(1, 0).isLoading.value"
                  @submit="next($event, { job: 1, task: index })"
                  @skip="skip({ job: 1, task: index })"
                />
              </MintStep>
            </template>
          </StepperItem>

          <StepperItem
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
                <PrintTask
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
          </StepperItem>

          <StepperItem
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
          </StepperItem>

          <StepperItem
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
          </StepperItem>

          <StepperItem title="Confirmation">
            <MintStep :isActive="finishedTasks.mint">
              <template v-slot:description
                >Enjoy your newly created Magic Mondrian NFT(s). The following
                tasks have been completed:</template
              >
              <ConfirmationTask :finishedTasks="finishedTasks" />
            </MintStep>
          </StepperItem>
        </StepperContainer>
      </div>

      <TransactionModal
        v-model="showMintTransactionModal"
        task="Mint NFT"
        :price="mintPrice"
      />

      <TransactionModal
        v-model="showPrintTransactionModal"
        task="Print NFT"
        :price="printPrice"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, toRaw, reactive, computed } from "vue";
import { useWallet } from "@whitelabel-solutions/wallet-connector-vue";
import { useWalletExtended } from "@/composables/useWalletExtended";
import { Price, SalePhase } from "@/utils/constants";
import { useFlag } from "@/composables/useFlags";
import StepperContainer from "@/components/stepper/StepperContainer.vue";
import QuantityTask from "@/components/mint/QuantityTask.vue";
import TicketTask from "@/components/mint/EventTask.vue";
import useSubgraph from "@/composables/useSubgraph";
import MintStep from "@/components/mint/MintStep.vue";
import PrintTask from "@/components/mint/PrintTask.vue";
import LogoIcon from "@/components/icons/LogoIcon.vue";
import StepperItem from "@/components/stepper/StepperItem.vue";
import { authInterface } from "@/services/BackendInterface";
import MondrianInterface from "@/services/MondrianInterface";
import { ethers } from "ethers";
import useAsyncTasksCycle from "@/composables/useAsyncTasksCycle";
import ConfirmationTask from "@/components/mint/ConfirmationTask.vue";
import { notify } from "notiwind";
import { MintDescription } from "@/utils/constants";
import TransactionModal from "@/components/wallet/TransactionModal.vue";
import { useHead } from "@vueuse/head";

const emit = defineEmits(["loaded"]);

const whitelistEnabled = useFlag(SalePhase.WhitelistSale);
const presaleEnabled = useFlag(SalePhase.PreSale);
const { address } = useWallet();
const { provider } = useWalletExtended();
const { getTokenByAddress } = useSubgraph();

useHead({
  title: "Mint",
});

const mintPrice = computed(() =>
  whitelistEnabled.value ? Price.whitelist : Price.default
);

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

emit("loaded", false);

onMounted(() => {
  emit("loaded", true);
});

const setQuantity = (quantity: number) => ({
  quantity,
  price: mintPrice.value,
});

const getVoucher = async function (mintData: {
  quantity: number;
  price: string;
}) {
  const signature = await authInterface.getVoucher();
  return { ...mintData, signature };
};

const mint = async function (mintData: any) {
  showMintTransactionModal.value = true;

  const mondrianInterface: MondrianInterface = new MondrianInterface(
    toRaw(provider.value as ethers.providers.Web3Provider)
  );
  let tx = null;
  try {
    tx = await mondrianInterface.mint(mintData, { txWait: false });
  } finally {
    showMintTransactionModal.value = false;
  }
  const receipt = await tx?.wait();
  finishedTasks.mint = true;
  return receipt;
};

const getTokens = async function (tx: ethers.ContractReceipt) {
  tokens.value = await getTokenByAddress(address.value, tx);
  finishedTasks.getTokens = true;
};

const sendTicket = async function (email: string) {
  await authInterface.sendMail(email);
  finishedTasks.sendTicket = true;
};

const setPrintData = (printData: any) => printData;

const sendPrintPayment = async (printData: any) => {
  showPrintTransactionModal.value = true;
  const mondrianInterface: MondrianInterface = new MondrianInterface(
    toRaw(provider.value as ethers.providers.Web3Provider)
  );
  let tx = null;
  try {
    tx = await mondrianInterface.print(
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
  await authInterface.print(printData);
  finishedTasks.print = true;
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
