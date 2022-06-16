<template>
  <StepperContainer v-model="step">
    <MintStep title="Select quantity">
      <template v-slot:description>
        Adjust the number of Magic Mondrian NFT's you want to own!
      </template>
      <QuantityTask v-model="data.quantity" @submit="nextJob" />
    </MintStep>

    <MintStep title="Generate Voucher" :task="tasks[0]">
      <template v-slot:description>
        Verify that your address is eligible for Whitelist Sale and generate
        voucher
      </template>
    </MintStep>

    <MintStep title="Receive Event Invitation">
      <template v-slot:description>
        As an owner of a Magic Mondrian NFT you have the opportunity to take
        part in an exclusive offline event. The only thing we need is your
        email, so we can send you the tickets and provide you with further
        details on the event!
      </template>

      <TicketTask v-model="data.email" @submit="nextJob" @skip="skipJob" />
    </MintStep>

    <MintStep title="Order physical NFT"> </MintStep>

    <MintStep title="Mint" :task="tasks[3]">
      <template v-slot:description>
        Creating your own Magic Mondrian NFT
      </template>
    </MintStep>

    <MintStep title="Load NFT" :task="tasks[4]">
      <template v-slot:description> Receiving your minted NFT </template>
    </MintStep>

    <MintStep title="Confirmation">
      <template v-slot:description> Confirmation </template>
    </MintStep>
  </StepperContainer>
</template>

<script setup lang="ts">
import { ref, toRaw, onMounted } from "vue";
import MondrianInterface from "@/services/MondrianInterface";
import { authInterface } from "@/services/AuthInterface";
import { useWallet } from "@whitelabel-solutions/wallet-connector-vue";
import { useWalletExtended } from "@/composables/useWalletExtended";
import { ethers } from "ethers";
import { Price, SalePhase } from "@/utils/constants";
import { useFlag } from "@/composables/useFlags";
import StepperContainer from "@/components/stepper/StepperContainer.vue";
import QuantityTask from "@/components/mint/QuantityTask.vue";
import TicketTask from "@/components/mint/TicketTask.vue";
import useSubgraph from "@/composables/useSubgraph";
import useQueue from "@/composables/useQueue";
import useTask from "@/composables/useTask";
import MintStep from "@/components/mint/MintStep.vue";

const emit = defineEmits(["loaded"]);
const whitelistEnabled = useFlag(SalePhase.WhitelistSale);
const { address } = useWallet();
const { provider } = useWalletExtended();
const { getTokenByAddress } = useSubgraph();

const step = ref(0);
const job = ref(0);
const jobsDisabled = ref(false);

const price = whitelistEnabled.value ? Price.whitelist : Price.default;

const data = ref({
  voucher: "",
  quantity: 1,
  email: "",
  order: {
    url: "",
    zip: "",
  },
  tokens: [],
});

emit("loaded", false);

onMounted(() => {
  emit("loaded", true);
});

const getVoucher = function* () {
  data.value.voucher = yield authInterface.getVoucher();
};
const setTicket = function* (email: string) {
  data.value.email = email;
  yield;
};
const sendTicket = function* () {
  yield authInterface.sendMail(data.value.email);
};

const setOrder = function* () {
  yield;
};
const mint = function* () {
  const mondrianInterface: MondrianInterface = new MondrianInterface(
    toRaw(provider.value as ethers.providers.Web3Provider)
  );

  yield mondrianInterface.mint(data.value.quantity, price, data.value.voucher);
};
const getTokens = function* ({ signal, tx }: any) {
  data.value.tokens = yield getTokenByAddress(address.value, signal, tx);
};

const tasks = [getVoucher, setTicket, setOrder, mint, getTokens].map(useTask);

const queue = useQueue();

const skipJob = () => {
  console.log("skip jobs");
};

const nextJob = () => {
  if (jobsDisabled.value) {
    return;
  }
  jobsDisabled.value = true;
  step.value = queue.size + 1;
  tasks.slice(queue.size, [1, 1, 3][job.value]).forEach((task, i) =>
    queue.enqueue({
      ...task,
      then: async () => {
        step.value = queue.size + i;
      },
    })
  );
  queue.last?.finally(async () => (jobsDisabled.value = false));
  job.value++;
};
</script>
