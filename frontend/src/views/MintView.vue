<template>
  <div
    class="py-8 bg-reddish mondrian-border-b text-white bg-hero-pattern-charlie"
  >
    <div class="container px-8 mx-auto">
      <div class="py-24">
        <h1 class="text-center font-bold text-4xl leading-relaxed">
          Create your <LogoIcon class="!text-4xl" />
        </h1>
      </div>
    </div>
  </div>

  <div class="container max-w-md lg:max-w-4xl py-8 lg:px-8 mx-auto">
    <StepperContainer v-model="step">
      <StepperItem title="Select quantity">
        <MintStep :isActive="taskIndex >= 0">
          <template v-slot:description>
            Adjust the number of Magic Mondrian NFT's you want to own!
          </template>
          <QuantityTask v-model="data.quantity" @submit="next(0)" />
        </MintStep>
      </StepperItem>

      <StepperItem
        title="Generate Voucher"
        :isReady="tasks[0][0].isReady"
        :isLoading="tasks[0][0].isLoading"
        :error="tasks[0][0].error"
      >
        <MintStep :isActive="taskIndex >= 1">
          <template v-slot:description>
            Verify that your address is eligible for Whitelist Sale and generate
            voucher
          </template>
        </MintStep>
      </StepperItem>

      <StepperItem
        title="Mint"
        :isReady="tasks[0][1].isReady"
        :isLoading="tasks[0][1].isLoading"
        :error="tasks[0][1].error"
      >
        <MintStep :isActive="taskIndex >= 2">
          <template v-slot:description>
            Creating your Magic Mondrian NFT
          </template>
        </MintStep>
      </StepperItem>

      <StepperItem
        title="Load NFT"
        :isReady="tasks[0][2].isReady"
        :isLoading="tasks[0][2].isLoading"
        :error="tasks[0][2].error"
      >
        <MintStep :isActive="taskIndex >= 3">
          <template v-slot:description> Receiving your minted NFT </template>
        </MintStep>
      </StepperItem>

      <StepperItem
        title="Receive Event Invitation"
        :isReady="tasks[1][0].isReady"
        :isLoading="tasks[1][0].isLoading"
        :error="tasks[1][0].error"
      >
        <MintStep :isActive="taskIndex >= 4">
          <template v-slot:description>
            As an owner of a Magic Mondrian NFT you have the opportunity to take
            part in an exclusive offline event. The only thing we need is your
            email, so we can send you the tickets and provide you with further
            details on the event!
          </template>

          <TicketTask v-model="data.email" @submit="next(1)" @skip="skip(1)" />
        </MintStep>
      </StepperItem>

      <StepperItem
        title="Print NFT"
        :isReady="tasks[2][0].isReady"
        :isLoading="tasks[2][0].isLoading"
        :error="tasks[2][0].error"
      >
        <MintStep :isActive="taskIndex >= 5">
          <template v-slot:description>
            Order a printed artwork of your Magic Mondrian NFT
          </template>
          <PrintTask v-model="data.print" @submit="next(2)" @skip="skip(2)" />
        </MintStep>
      </StepperItem>

      <StepperItem title="Confirmation">
        <MintStep :isActive="taskIndex >= 6">
          <template v-slot:description> Confirmation </template>
        </MintStep>
      </StepperItem>
    </StepperContainer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, unref, reactive, Ref } from "vue";
import { useWallet } from "@whitelabel-solutions/wallet-connector-vue";
import { useWalletExtended } from "@/composables/useWalletExtended";
import { Price, SalePhase } from "@/utils/constants";
import { useFlag } from "@/composables/useFlags";
import StepperContainer from "@/components/stepper/StepperContainer.vue";
import QuantityTask from "@/components/mint/QuantityTask.vue";
import TicketTask from "@/components/mint/TicketTask.vue";
import useSubgraph from "@/composables/useSubgraph";
import MintStep from "@/components/mint/MintStep.vue";
import PrintTask from "@/components/mint/PrintTask.vue";
import {
  promiseTimeout,
  useAsyncQueue,
  UseAsyncQueueReturn,
  UseAsyncQueueTask,
  useAsyncState,
  UseAsyncStateReturn,
  useCycleList,
} from "@vueuse/core";
import LogoIcon from "@/components/icons/LogoIcon.vue";
import StepStatus from "@/components/mint/StepStatus.vue";
import StepperItem from "@/components/stepper/StepperItem.vue";

const emit = defineEmits(["loaded"]);
const whitelistEnabled = useFlag(SalePhase.WhitelistSale);
const { address } = useWallet();
const { provider } = useWalletExtended();
const { getTokenByAddress } = useSubgraph();

const step = ref(0);
const taskIndex = ref(1);
const queueLock = ref(false);

const price = whitelistEnabled.value ? Price.whitelist : Price.default;

const data = ref({
  voucher: "",
  quantity: 1,
  email: "",
  print: {
    firstName: "",
    lastName: "",
    email: "",
    streetName: "",
    streetNumber: null,
    city: "",
    zipCode: "",
    country: "",
  },
  tokens: [],
});

emit("loaded", false);

onMounted(() => {
  emit("loaded", true);
});

const getVoucher = async function () {
  data.value.voucher = "VOUCHER_VALUE";
  console.log("authInterface.getVoucher", data.value.voucher);
  await promiseTimeout(1200);
  console.log("authInterface.getVoucher finished");
  // data.value.voucher = yield authInterface.getVoucher();
};

const mint = async function () {
  console.log(
    "mondrianInterface.mint",
    data.value.quantity,
    price,
    data.value.voucher
  );
  // const mondrianInterface: MondrianInterface = new MondrianInterface(
  //   toRaw(provider.value as ethers.providers.Web3Provider)
  // );
  //
  // yield mondrianInterface.mint(data.value.quantity, price, data.value.voucher);
  await promiseTimeout(1200);
  console.log("mondrianInterface.mint finished");
  return;
};

const getTokens = async function () {
  // data.value.tokens = yield getTokenByAddress(address.value, signal, tx);
  console.log("getTokens");
  await promiseTimeout(1200);
  console.log("getTokens finished");
};

const sendTicket = async function () {
  // await authInterface.sendMail(data.value.email);
  console.log("authInterface.sendMail", data.value.email);
  await promiseTimeout(1200);
  console.log("authInterface.sendMail finished");
  return;
};

const print = async function () {
  const { streetName, streetNumber, firstName, lastName, ...printData } = unref(
    data.value.print
  );
  const payload = {
    ...printData,
    street: `${streetName} ${streetNumber}`,
    name: `${firstName} ${lastName}`,
    countryCode: 1,
  };

  console.log("print", payload);
  await promiseTimeout(1200);
  console.log("print finished");
  return;
};

const queue: Ref<UseAsyncQueueReturn<any>[]> = ref([]);
const tasks: UseAsyncStateReturn<any, true>[][] = [
  [getVoucher, mint, getTokens],
  [sendTicket],
  [print],
].map((_) =>
  _.map((task: any) =>
    useAsyncState(
      (args) =>
        task(args).then((res: any) => {
          taskIndex.value++;
          step.value = taskIndex.value;
          return res;
        }),
      null,
      { immediate: false }
    )
  )
);

// const { state, next, prev } = useCycleList([
//   mintQueue,
//   ticketQueue,
//   printQueue,
// ]);

const onFinished = () => {
  queueLock.value = false;
};

const skip = (queueIndex: number) => {
  const nextTasks = tasks[queueIndex];
  taskIndex.value += nextTasks.length;
  step.value = taskIndex.value;
};

const next = (queueIndex: number) => {
  if (queueLock.value) {
    return;
  }
  queueLock.value = true;
  const nextTasks = tasks[queueIndex];
  step.value = taskIndex.value;
  queue.value = [
    ...queue.value,
    useAsyncQueue(
      nextTasks.map((task) => task.execute),
      {
        onFinished,
      }
    ),
  ];
};
</script>
