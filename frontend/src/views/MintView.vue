<template>
  <section>
    <div class="container px-8 mx-auto">
      <StepperContainer>
        <StepperItem :title="MintStepKey.GET_VOUCHER" v-if="whitelistEnabled">
          <MintStep :step="steps[MintStepKey.GET_VOUCHER]" />
        </StepperItem>
        <StepperItem :title="MintStepKey.MINT">
          <MintStep :step="steps[MintStepKey.MINT]" />
        </StepperItem>
        <StepperItem :title="MintStepKey.LOAD_TOKEN">
          <MintStep :step="steps[MintStepKey.LOAD_TOKEN]" />
        </StepperItem>
        <StepperItem title="Confirmation">
          <MintSuccess :tokens="tokens" @update:modelValue="reset" />
        </StepperItem>
      </StepperContainer>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, toRaw, computed, watch, onMounted } from "vue";
import MintSuccess from "@/components/mint/MintSuccess.vue";
import MondrianInterface from "@/services/MondrianInterface";
import useTask from "@/composables/useTask";
import { authInterface } from "@/services/AuthInterface";
import { useWallet } from "@whitelabel-solutions/wallet-connector-vue";
import { useWalletExtended } from "@/composables/useWalletExtended";
import { ethers } from "ethers";
import {
  CONTRACT_ADDRESS,
  MAMO_SUBGRAPH,
  MintStepKey,
  SalePhase,
} from "@/utils/constants";
import { useFetch } from "@vueuse/core";
import { getContract, getTokensFromBlock } from "@/services/graphql/types";
import type { Task } from "@/composables/useTask";
import useContract from "@/composables/useContract";
import { useFlag } from "@/composables/useFlags";
import StepperContainer from "@/components/stepper/StepperContainer.vue";
import StepperItem from "@/components/stepper/StepperItem.vue";
import MintStep from "@/components/mint/MintStep.vue";
import { MintStepType } from "@/utils/types";

// phase handling

const presaleEnabled = useFlag(SalePhase.PreSale);
const whitelistEnabled = useFlag(SalePhase.WhitelistSale);
const publicsaleEnabled = useFlag(SalePhase.PublicSale);
const revealEnabled = useFlag(SalePhase.Reveal);

const { address } = useWallet();
const { provider } = useWalletExtended();
const tokens = ref([]);

const emits = defineEmits(["loaded"]);

onMounted(() => emits("loaded", false));

const connected = ref(false);
const quantity = ref(1);
const { contract } = useContract();
const { isConnected } = useWallet();

const currentPhase = computed(() => {
  if (revealEnabled.value) return SalePhase.Reveal;
  if (publicsaleEnabled.value) return SalePhase.PublicSale;
  if (whitelistEnabled.value) return SalePhase.WhitelistSale;
  if (presaleEnabled.value) return SalePhase.PreSale;
  return "";
});

const price = computed(() =>
  currentPhase.value === SalePhase.WhitelistSale ? "0.00025" : "0.005"
);

// job to generate voucher (whitelist sale)
const getVoucher = function* (): any {
  return yield authInterface.getVoucher();
};

// job to execute minting (whitelist sale or public sale)
const execMint = function* (signal: any, voucher: string): any {
  const mondrianInterface: MondrianInterface = new MondrianInterface(
    toRaw(provider.value as ethers.providers.Web3Provider)
  );
  return yield mondrianInterface.mint(quantity.value, price.value, voucher);
};

const timeout = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

// job to receive tokens from indexer
const getToken = function* (signal: any, tx: ethers.ContractTransaction): any {
  const block = tx.blockNumber;
  while (true) {
    const { data } = yield useFetch(MAMO_SUBGRAPH, { timeout: 10000 })
      .post(
        JSON.stringify({
          query: getTokensFromBlock,
          variables: {
            address: address.value.toLowerCase(),
            block,
          },
        })
      )
      .json();
    if (data?.value?.data?.tokens?.length > 0) {
      tokens.value = data.value.data.tokens;
      break;
    } else {
      yield timeout(5000); // wait 5s
    }
  }
  yield tokens;
};

const reset = () => {
  setTimeout(() => {
    tokens.value = [];
  }, 500);
};

const { onFetchResponse, data, execute, isFinished } = useFetch(MAMO_SUBGRAPH, {
  timeout: 10000,
})
  .post(
    JSON.stringify({
      query: getContract,
      variables: {
        id: CONTRACT_ADDRESS.toLocaleLowerCase(),
      },
    })
  )
  .json();

watch(isFinished, () => {
  if (isFinished) emits("loaded", true);
});

const steps: Record<MintStepKey, MintStepType> = {
  [MintStepKey.GET_VOUCHER]: {
    task: useTask(getVoucher),
    title: MintStepKey.GET_VOUCHER,
    description:
      "Check if your address is eligible for Whitelist Sale and receive voucher",
  },
  [MintStepKey.MINT]: {
    task: useTask(execMint),
    title: MintStepKey.MINT,
    description: "Create your own Magic Mondrian NFT's",
  },
  [MintStepKey.LOAD_TOKEN]: {
    task: useTask(getToken),
    title: MintStepKey.LOAD_TOKEN,
    description: "Receiving your minted NFT's",
  },
};
</script>
