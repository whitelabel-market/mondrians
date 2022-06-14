<template>
  <section>
    <div class="container max-w-4xl px-8 mx-auto">
      <MintProgress
        v-if="!tokens.length"
        :tasks="tasks"
        :whitelistEnabled="whitelistEnabled"
        @update:modelValue="reset"
      />
      <MintSuccess v-else :tokens="tokens" @update:modelValue="reset" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, toRaw, computed, watch, onMounted } from "vue";
import MintProgress from "@/components/mint/MintProgress.vue";
import MintSuccess from "@/components/mint/MintSuccess.vue";
import MondrianInterface from "@/services/MondrianInterface";
import useTask from "@/composables/useTask";
import { authInterface } from "@/services/AuthInterface";
import { useWallet } from "@whitelabel-solutions/wallet-connector-vue";
import { useWalletExtended } from "@/composables/useWalletExtended";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, MAMO_SUBGRAPH } from "@/utils/constants";
import { useFetch } from "@vueuse/core";
import { getContract, getTokensFromBlock } from "@/services/graphql/types";
import type { Task } from "@/composables/useTask";
import useContract from "@/composables/useContract";
import { useFlag } from "@/composables/useFlags";

// phase handling

enum Phase {
  PreSale = "presale",
  WhitelistSale = "whitelistsale",
  PublicSale = "publicsale",
  Reveal = "reveal",
}

const presaleEnabled = useFlag(Phase.PreSale);
const whitelistEnabled = useFlag(Phase.WhitelistSale);
const publicsaleEnabled = useFlag(Phase.PublicSale);
const revealEnabled = useFlag(Phase.Reveal);

const { address } = useWallet();
const { provider } = useWalletExtended();
const tokens = ref([]);
const tasks = computed<Task<any>[]>(() => {
  return whitelistEnabled
    ? [useTask(getVoucher), useTask(execMint), useTask(getToken)]
    : [useTask(execMint), useTask(getToken)];
});

const emits = defineEmits(["loaded"]);

onMounted(() => emits("loaded", false));

const connected = ref(false);
const quantity = ref(1);
const { contract } = useContract();
const { isConnected } = useWallet();

const currentPhase = computed(() => {
  if (revealEnabled.value) return Phase.Reveal;
  if (publicsaleEnabled.value) return Phase.PublicSale;
  if (whitelistEnabled.value) return Phase.WhitelistSale;
  if (presaleEnabled.value) return Phase.PreSale;
  return "";
});

const price = computed(() =>
  currentPhase.value === Phase.WhitelistSale ? "0.00025" : "0.005"
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
</script>
