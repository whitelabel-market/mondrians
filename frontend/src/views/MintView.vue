<template>
  <div
    class="pb-8 pt-28 text-neutral-50 bg-crimson-500 dark:bg-crimson-800 mondrian-border-b bg-hero-pattern-charlie"
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

  <div
    v-if="!presaleEnabled"
    class="transition-colors duration-100 bg-white dark:bg-neutral-900"
  >
    <div
      class="container max-w-4xl py-8 mx-auto transition-colors lg:px-8 dark:text-neutral-200"
    >
      <StepperContainer v-model="step">
        <StepperItem title="Select quantity" v-bind="task(0, 0)">
          <template v-slot="{ index }">
            <MintStep :isActive="taskIndex >= index">
              <template v-slot:description>
                Please adjust the number of Magic Mondrian NFT's you want to own
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
          title="Generate Voucher"
          v-bind="task(0, 1)"
        >
          <template v-slot="{ index }">
            <MintStep :isActive="taskIndex >= index">
              <template v-slot:description>
                Confirming that your address is eligible for whitelist sale
              </template>
            </MintStep>
          </template>
        </StepperItem>

        <StepperItem title="Mint" v-bind="task(0, whitelistEnabled ? 2 : 1)">
          <template v-slot="{ index }">
            <MintStep :isActive="taskIndex >= index">
              <template v-slot:description>
                Please confirm the transaction to create your own Magic Mondrian
                NFT
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
                Receiving your minted NFT
              </template>
            </MintStep>
          </template>
        </StepperItem>

        <StepperItem
          title="Receive Event Invitation"
          v-if="whitelistEnabled"
          v-bind="task(1, 0)"
        >
          <template v-slot="{ index }">
            <MintStep :isActive="taskIndex >= index">
              <template v-slot:description>
                As an owner of a Magic Mondrian NFT you have the opportunity to
                take part in an exclusive real life event. Register your email
                address and we will send you the tickets and give further
                information. You can receive an invitation also in your user
                profile.
              </template>

              <TicketTask
                :disabled="task(1, 0).isReady.value || taskIndex.value < index"
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
                Order a printed artwork of your Magic Mondrian NFT. Currently,
                only one printable version per purchase is allowed. You can
                issue additional print orders in your user profile.
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
          title="Sending print payment"
          v-bind="task(whitelistEnabled ? 2 : 1, 1)"
        >
          <template v-slot="{ index }">
            <MintStep :isActive="taskIndex >= index">
              <template v-slot:description
                >Please confirm the transaction to pay for your print order.
                This is the only payment, no other fees will be charged later
                on</template
              >
            </MintStep>
          </template>
        </StepperItem>

        <StepperItem
          title="Sending print order"
          v-bind="task(whitelistEnabled ? 2 : 1, 2)"
        >
          <template v-slot="{ index }">
            <MintStep :isActive="taskIndex >= index">
              <template v-slot:description>
                Processing of your print order. We will send a confirmation
                message to your email address</template
              >
            </MintStep>
          </template>
        </StepperItem>

        <StepperItem title="Confirmation">
          <MintStep :isActive="finishedTasks.mint">
            <template v-slot:description
              >Enjoy your newly created Magic Mondrian NFTs. The following tasks
              have been completed:</template
            >
            <ConfirmationTask :finishedTasks="finishedTasks" />
          </MintStep>
        </StepperItem>
      </StepperContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, toRaw, reactive } from "vue";
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

const emit = defineEmits(["loaded"]);
const whitelistEnabled = useFlag(SalePhase.WhitelistSale);
const presaleEnabled = useFlag(SalePhase.PreSale);
const { address } = useWallet();
const { provider } = useWalletExtended();
const { getTokenByAddress } = useSubgraph();

const tokens = ref([]);
const step = ref(0);

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
  price: whitelistEnabled.value ? Price.whitelist : Price.default,
});

const getVoucher = async function (mintData: {
  quantity: number;
  price: string;
}) {
  const voucher = await authInterface.getVoucher();
  return { ...mintData, voucher };
};

const mint = async function (mintData: {
  quantity: number;
  price: string;
  voucher?: string;
}) {
  const mondrianInterface: MondrianInterface = new MondrianInterface(
    toRaw(provider.value as ethers.providers.Web3Provider)
  );

  const tx = await mondrianInterface.mint(
    mintData.quantity,
    mintData.price,
    mintData.voucher
  );

  finishedTasks.mint = true;
  return tx;
};

const getTokens = async function (tx: ethers.ContractTransaction) {
  tokens.value = await getTokenByAddress(address.value, tx);
  finishedTasks.getTokens = true;
};

const sendTicket = async function (email: string) {
  await authInterface.sendMail(email);
  finishedTasks.sendTicket = true;
};

const setPrintData = (printData: any) => printData;

const sendPrintPayment = async (printData: any) => {
  // const mondrianInterface: MondrianInterface = new MondrianInterface(
  //   toRaw(provider.value as ethers.providers.Web3Provider)
  // );
  // await mondrianInterface.print();
  return printData;
};

const sendPrintOrder = async (printData: any) => {
  await authInterface.print({
    ...printData,
  });
  finishedTasks.print = true;
};

const tasks: any[] = [
  whitelistEnabled.value
    ? [setQuantity, getVoucher, mint, getTokens]
    : [setQuantity, mint, getTokens],
];
whitelistEnabled.value && tasks.push([sendTicket]);
tasks.push([setPrintData, sendPrintPayment, sendPrintOrder]);

const { skip, next, jobs, taskIndex, error, isError } = useAsyncTasksCycle(
  ...tasks
);

watch(taskIndex, () => {
  step.value = taskIndex.value;
});

watch(isError, () => {
  if (isError.value) {
    let message;
    try {
      message = JSON.stringify(error.value);
    } catch {
      message = error.value;
    }
    notify(
      {
        group: "app",
        title: "Something went wrong!",
        text: "Please contact the support.",
        data: message,
      },
      1000 * 60
    ); // 1min
  }
});

const task = (job: number, task: number) => {
  const { isLoading, isReady, error } = jobs[job][task];
  return { isLoading, isReady, error };
};
</script>
