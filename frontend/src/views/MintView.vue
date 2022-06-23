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
    <StepperContainer v-model="taskIndex">
      <StepperItem title="Select quantity">
        <template v-slot="{ index }">
          <MintStep :isActive="taskIndex >= index">
            <template v-slot:description>
              Adjust the number of Magic Mondrian NFT's you want to own!
            </template>
            <QuantityTask
              :disabled="task(0, 0).isReady.value || taskIndex < index"
              v-model="data.mint.quantity"
              @submit="nextJob({ task: 1 })"
            />
          </MintStep>
        </template>
      </StepperItem>

      <StepperItem title="Generate Voucher" v-bind="task(0, 0)">
        <template v-slot="{ index }">
          <MintStep :isActive="taskIndex >= index">
            <template v-slot:description>
              Verify that your address is eligible for Whitelist Sale and
              generate voucher
            </template>
          </MintStep>
        </template>
      </StepperItem>

      <StepperItem title="Mint" v-bind="task(0, 1)">
        <template v-slot="{ index }">
          <MintStep :isActive="taskIndex >= index">
            <template v-slot:description>
              Creating your Magic Mondrian NFT
            </template>
          </MintStep>
        </template>
      </StepperItem>

      <StepperItem title="Load NFT" v-bind="task(0, 2)">
        <template v-slot="{ index }">
          <MintStep :isActive="taskIndex >= index">
            <template v-slot:description> Receiving your minted NFT </template>
          </MintStep>
        </template>
      </StepperItem>

      <StepperItem title="Receive Event Invitation" v-bind="task(1, 0)">
        <template v-slot="{ index }">
          <MintStep :isActive="taskIndex >= index">
            <template v-slot:description>
              As an owner of a Magic Mondrian NFT you have the opportunity to
              take part in an exclusive offline event. The only thing we need is
              your email, so we can send you the tickets and provide you with
              further details on the event!
            </template>

            <TicketTask
              v-model="data.ticket.email"
              :disabled="task(1, 0).isReady.value || taskIndex < index"
              @submit="nextJob({ job: 1, task: index })"
              @skip="nextJob({ job: 1, task: index }, true)"
            />
          </MintStep>
        </template>
      </StepperItem>

      <StepperItem title="Print NFT" v-bind="task(2, 0)">
        <template v-slot="{ index }">
          <MintStep :isActive="taskIndex >= index">
            <template v-slot:description>
              Order a printed artwork of your Magic Mondrian NFT
            </template>
            <PrintTask
              :disabled="task(2, 0).isReady.value || taskIndex < index"
              v-model="data.print"
              @submit="nextJob({ job: 2, task: index })"
              @skip="nextJob({ job: 2, task: index }, true)"
            />
          </MintStep>
        </template>
      </StepperItem>

      <StepperItem title="Confirmation">
        <template v-slot="{ index }">
          <MintStep :isActive="taskIndex >= index">
            <template v-slot:description> Confirmation </template>
          </MintStep>
        </template>
      </StepperItem>
    </StepperContainer>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  onMounted,
  unref,
  watch,
  toRefs,
  toRef,
  toRaw,
  reactive,
} from "vue";
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
import { promiseTimeout } from "@vueuse/core";
import LogoIcon from "@/components/icons/LogoIcon.vue";
import StepperItem from "@/components/stepper/StepperItem.vue";
import { authInterface } from "@/services/AuthInterface";
import MondrianInterface from "@/services/MondrianInterface";
import { ethers } from "ethers";
import useAsyncTasksCycle from "@/composables/useAsyncTasksCycle";

const emit = defineEmits(["loaded"]);
const whitelistEnabled = useFlag(SalePhase.WhitelistSale);
const { address } = useWallet();
const { provider } = useWalletExtended();
const { getTokenByAddress } = useSubgraph();

const data = ref({
  mint: {
    quantity: 1,
    voucher: "",
    price: whitelistEnabled.value ? Price.whitelist : Price.default,
    tokens: [],
  },
  ticket: {
    email: "",
  },
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
});

emit("loaded", false);

onMounted(() => {
  emit("loaded", true);
});

const getVoucher = async function () {
  console.log("getVoucher", (data.value.mint.voucher = "VOUCHEREXAMPLE"));
  await promiseTimeout(1200);
  console.log("getVoucher finished");

  // data.value.mint.voucher = await authInterface.getVoucher();
};

const mint = async function () {
  // const mondrianInterface: MondrianInterface = new MondrianInterface(
  //   toRaw(provider.value as ethers.providers.Web3Provider)
  // );
  const { quantity, price, voucher } = data.value.mint;
  console.log("mint", quantity, price, voucher);
  await promiseTimeout(1200);
  console.log("mint finished");
  //return mondrianInterface.mint(quantity, price, voucher);
};

const getTokens = async function () {
  console.log("getTokens");
  await promiseTimeout(1200);
  console.log("getTokens finished");

  //data.value.mint.tokens = await getTokenByAddress(address.value, signal, tx);
};

const sendTicket = async function () {
  console.log("sendTicket", data.value.ticket.email);
  await promiseTimeout(1200);
  console.log("sendTicket finished");

  //await authInterface.sendMail(data.value.ticket.email);
};

const print = async function () {
  const { streetName, streetNumber, firstName, lastName, ...printData } = unref(
    data.value.print
  );
  const payload = {
    ...printData,
    street: `${streetName} ${streetNumber}`,
    name: `${firstName} ${lastName}`,
    countryCode: "de",
  };

  console.log("print", payload);
  await promiseTimeout(1200);
  console.log("print finished");
};

const { skip, next, jobs, taskIndex } = useAsyncTasksCycle(
  [getVoucher, mint, getTokens],
  [sendTicket],
  [print]
);

const nextJob = (from: { job?: number; task?: number }, doSkip = false) => {
  doSkip ? skip(from) : next(from);
};

const task = (job: number, task: number) => {
  const { isLoading, isReady, error } = jobs[job][task];
  return { isLoading, isReady, error };
};
</script>
