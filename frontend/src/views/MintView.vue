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
        <MintStep :isActive="true">
          <template v-slot:description>
            Adjust the number of Magic Mondrian NFT's you want to own!
          </template>
          <QuantityTask
            :disabled="task(0, 0).isReady.value"
            @submit="next({ task: 1 }, $event)"
          />
        </MintStep>
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
            <TokenList
              dense
              slider
              :tokens="tokens"
              :is-finished="tokens.value.length > 0"
            />
          </MintStep>
        </template>
      </StepperItem>

      <StepperItem title="Receive Event Invitation" v-bind="task(1, 0)">
        <template v-slot="{ index }">
          <MintStep :isActive="taskIndex >= index">
            <template v-slot:description>
              As an owner of a Magic Mondrian NFT you have the opportunity to
              take part in an exclusive real life event. Register your email
              address and we will send you the tickets and give further
              information.
            </template>

            <TicketTask
              :disabled="task(1, 0).isReady.value || taskIndex.value < index"
              @submit="next({ job: 1, task: index }, $event)"
              @skip="skip({ job: 1, task: index })"
            />
          </MintStep>
        </template>
      </StepperItem>

      <StepperItem title="Print NFT" v-bind="task(2, 0)">
        <template v-slot="{ index }">
          <MintStep :isActive="taskIndex >= index">
            <template v-slot:description>
              Order a printed artwork of your Magic Mondrian NFT. Currently,
              only one printable version per purchase is allowed.
            </template>
            <PrintTask
              :tokens="tokens"
              :disabled="task(2, 0).isReady.value || taskIndex.value < index"
              @submit="next({ job: 2, task: index }, $event)"
              @skip="skip({ job: 2, task: index })"
            />
          </MintStep>
        </template>
      </StepperItem>

      <StepperItem title="Confirmation">
        <template v-slot="{ index }">
          <MintStep :isActive="taskIndex >= index">
            <template v-slot:description
              >Enjoy your newly created Magic Mondrian NFTs. The following tasks
              have been completed:</template
            >
            <ConfirmationTask :finishedTasks="finishedTasks" />
          </MintStep>
        </template>
      </StepperItem>
    </StepperContainer>
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
import ConfirmationTask from "@/components/mint/ConfirmationTask.vue";
import TokenList from "@/components/tokens/TokenList.vue";

const emit = defineEmits(["loaded"]);
const whitelistEnabled = useFlag(SalePhase.WhitelistSale);
const { address } = useWallet();
const { provider } = useWalletExtended();
const { getTokenByAddress } = useSubgraph();

const tokens = ref([]);
const step = ref(0);
const finishedTasks = reactive({
  mint: false,
  sendTicket: false,
  print: false,
});
emit("loaded", false);

onMounted(() => {
  emit("loaded", true);
});

const getVoucher = async function (quantity: number) {
  const price = whitelistEnabled.value ? Price.whitelist : Price.default;
  const voucher = await authInterface.getVoucher();
  await promiseTimeout(1000);
  return { quantity, price, voucher };
};

const mint = async function (mintData: {
  quantity: number;
  price: string;
  voucher: string;
}) {
  const mondrianInterface: MondrianInterface = new MondrianInterface(
    toRaw(provider.value as ethers.providers.Web3Provider)
  );
  console.log("mint", mintData);
  const tx = await mondrianInterface.mint(
    mintData.quantity,
    mintData.price,
    mintData.voucher
  );
  console.log("mint res", tx);

  finishedTasks.mint = true;
  return tx;
};

const getTokens = async function (tx: ethers.ContractTransaction) {
  console.log("getTokens", tx);
  tokens.value = await getTokenByAddress(address.value, tx);
  console.log("got Tokens", tokens.value);
};

const sendTicket = async function (email: string) {
  await authInterface.sendMail(email);
  finishedTasks.sendTicket = true;
};

const print = async function ({
  streetName,
  streetNumber,
  firstName,
  lastName,
  ...printData
}: any) {
  const payload = {
    ...printData,
    street: `${streetName} ${streetNumber}`,
    name: `${firstName} ${lastName}`,
    countryCode: "de",
  };

  await authInterface.print(payload);
  finishedTasks.print = true;
};

const { skip, next, jobs, taskIndex } = useAsyncTasksCycle(
  [getVoucher, mint, getTokens],
  [sendTicket],
  [print]
);

watch(taskIndex, () => {
  step.value = taskIndex.value;
});

const task = (job: number, task: number) => {
  const { isLoading, isReady, error } = jobs[job][task];
  return { isLoading, isReady, error };
};
</script>
