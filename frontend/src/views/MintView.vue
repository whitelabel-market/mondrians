<template>
  <div
    class="py-8 bg-reddish mondrian-border-b text-white bg-hero-pattern-charlie"
  >
    <div class="container px-8 mx-auto">
      <div class="py-24">
        <h1 class="text-center font-bold text-4xl leading-relaxed">
          Create your <LogoIcon class="text-4xl" />
        </h1>
      </div>
    </div>
  </div>

  <div class="container max-w-4xl p-8 mx-auto">
    <StepperContainer v-model="step">
      <template v-slot:indicator="{ index }">
        <StepStatus :index="index" :status="tasks[index].status" />
      </template>

      <MintStep title="Select quantity" :index="0" :active="jobStep <= 0">
        <template v-slot:description>
          Adjust the number of Magic Mondrian NFT's you want to own!
        </template>
        <QuantityTask v-model="data.quantity" @submit="nextJob()" />
      </MintStep>

      <MintStep
        title="Generate Voucher"
        :index="1"
        :status="tasks[1].status"
        :active="jobStep <= 1"
      >
        <template v-slot:description>
          Verify that your address is eligible for Whitelist Sale and generate
          voucher
        </template>
      </MintStep>

      <MintStep
        title="Mint"
        :index="2"
        :status="tasks[2].status"
        :active="jobStep <= 2"
      >
        <template v-slot:description>
          Creating your Magic Mondrian NFT
        </template>
      </MintStep>

      <MintStep
        title="Load NFT"
        :index="3"
        :status="tasks[3].status"
        :active="jobStep <= 3"
      >
        <template v-slot:description> Receiving your minted NFT </template>
      </MintStep>

      <MintStep
        title="Receive Event Invitation"
        :index="4"
        :status="tasks[4].status"
        :active="jobStep <= 4"
      >
        <template v-slot:description>
          As an owner of a Magic Mondrian NFT you have the opportunity to take
          part in an exclusive offline event. The only thing we need is your
          email, so we can send you the tickets and provide you with further
          details on the event!
        </template>

        <TicketTask
          v-model="data.email"
          @submit="nextJob()"
          @skip="skipJob()"
        />
      </MintStep>

      <MintStep
        title="Print NFT"
        :index="5"
        :status="tasks[5].status"
        :active="jobStep <= 5"
      >
        <template v-slot:description>
          Order your Magic Mondrian NFT as a physical printed version
        </template>
        <PrintTask v-model="data.print" @submit="nextJob()" @skip="skipJob()" />
      </MintStep>

      <MintStep title="Confirmation" :index="6" :active="jobStep <= 6">
        <template v-slot:description> Confirmation </template>
      </MintStep>
    </StepperContainer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, unref } from "vue";
import { useWallet } from "@whitelabel-solutions/wallet-connector-vue";
import { useWalletExtended } from "@/composables/useWalletExtended";
import { Price, SalePhase } from "@/utils/constants";
import { useFlag } from "@/composables/useFlags";
import StepperContainer from "@/components/stepper/StepperContainer.vue";
import QuantityTask from "@/components/mint/QuantityTask.vue";
import TicketTask from "@/components/mint/TicketTask.vue";
import useSubgraph from "@/composables/useSubgraph";
import useQueue from "@/composables/useQueue";
import useTask from "@/composables/useTask";
import MintStep from "@/components/mint/MintStep.vue";
import PrintTask from "@/components/mint/PrintTask.vue";
import { promiseTimeout } from "@vueuse/core";
import LogoIcon from "@/components/icons/LogoIcon.vue";
import StepStatus from "@/components/mint/StepStatus.vue";

const emit = defineEmits(["loaded"]);
const whitelistEnabled = useFlag(SalePhase.WhitelistSale);
const { address } = useWallet();
const { provider } = useWalletExtended();
const { getTokenByAddress } = useSubgraph();

const step = ref(0);
const jobStep = ref(0);
const job = ref(0);
const jobsDisabled = ref(false);

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

const noTask = function* () {
  yield null;
};

const getVoucher = function* () {
  data.value.voucher = "VOUCHER_VALUE";
  yield promiseTimeout(1200);
  console.log("authInterface.getVoucher", data.value.voucher);
  // data.value.voucher = yield authInterface.getVoucher();
};

const mint = function* () {
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
  yield promiseTimeout(1200);
};

const getTokens = function* ({ signal, tx }: any) {
  // data.value.tokens = yield getTokenByAddress(address.value, signal, tx);
  yield promiseTimeout(1200);
  console.log("getTokens", signal, tx);
};

const sendTicket = function* () {
  yield promiseTimeout(1200);
  // yield authInterface.sendMail(data.value.email);
  console.log("authInterface.sendMail", data.value.email);
};

const print = function* () {
  const { streetName, streetNumber, firstName, lastName, ...printData } = unref(
    data.value.print
  );
  const payload = {
    ...printData,
    street: `${streetName} ${streetNumber}`,
    name: `${firstName} ${lastName}`,
    countryCode: 1,
  };

  yield promiseTimeout(1200);
  console.log("print", payload);
};

const tasks = [
  noTask,
  getVoucher,
  mint,
  getTokens,
  sendTicket,
  print,
  noTask,
].map(useTask);

const queue = useQueue();

const skipJob = () => {
  nextJob(true);
};

const nextJob = (skip = false) => {
  if (jobsDisabled.value) {
    return;
  }
  jobsDisabled.value = true;
  const nextTasks = tasks.slice(jobStep.value, [4, 5, 7][job.value]);

  if (skip) {
    jobStep.value += nextTasks.length;
    step.value = jobStep.value;
    jobsDisabled.value = false;
  } else {
    step.value = jobStep.value;
    nextTasks.forEach((task) => {
      task.then(async () => {
        jobStep.value++;
        step.value = jobStep.value;
      });
      queue.enqueue(task);
    });
    queue.last?.finally(async () => {
      jobsDisabled.value = false;
    });
  }
  job.value++;
};
</script>
