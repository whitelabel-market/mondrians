<template>
  <AppModal
    :model-value="modelValue"
    @update:modelValue="
      ($event) => {
        $emit('update:modelValue', $event);
        reset();
      }
    "
  >
    <MintProgress
      v-if="!tokens.length"
      :tasks="tasks"
      :whitelistEnabled="whitelistEnabled"
      @update:modelValue="
        ($event) => {
          $emit('update:modelValue', $event);
          reset();
        }
      "
    />
    <MintSuccess
      v-else
      :tokens="tokens"
      @update:modelValue="
        ($event) => {
          $emit('update:modelValue', $event);
          reset();
        }
      "
    />
  </AppModal>
</template>

<script setup lang="ts">
import { watch, ref, toRaw } from "vue";
import MintProgress from "@/components/mint/MintProgress.vue";
import MintSuccess from "@/components/mint/MintSuccess.vue";
import AppModal from "@/components/app/AppModal.vue";
import MondrianInterface from "@/services/MondrianInterface";
import useTask from "@/composables/useTask";
import { createAuthInterface } from "@/services/AuthInterface";
import type { AuthInterface } from "@/services/AuthInterface";
import { useWallet } from "@whitelabel-solutions/wallet-connector-vue";
import { useWalletExtended } from "@/composables/useWalletExtended";
import { ethers } from "ethers";
import { MAMO_SUBGRAPH } from "@/utils/constants";
import { useFetch } from "@vueuse/core";
import { getTokensFromBlock } from "@/services/graphql/types";
import type { Task } from "@/composables/useTask";

defineEmits(["update:modelValue"]);

let authInterface: AuthInterface;
const { address } = useWallet();
const { signMessage, provider } = useWalletExtended();
const tokens = ref([]);
const tasks = ref<Task<any>[]>([]);

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  whitelistEnabled: {
    type: Boolean,
    required: true,
  },
});

// job to get message to be signed
const getMessage = function* (): any {
  authInterface = createAuthInterface(address.value);
  const message: string = yield authInterface.login();
  const signature: string = yield signMessage(message);
  return yield authInterface.callback(signature);
};

// job to generate voucher (whitelist sale)
const getVoucher = function* (): any {
  return yield authInterface.getVoucher();
};

// job to execute minting (whitelist sale or public sale)
const execMint = function* (signal: any, voucher: string): any {
  const mondrianInterface: MondrianInterface = new MondrianInterface(
    toRaw(provider.value as ethers.providers.Web3Provider)
  );
  return yield mondrianInterface.mint(props.quantity, props.price, voucher);
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

watch(
  props,
  () => {
    if (props.modelValue === true)
      switch (props.whitelistEnabled) {
        case true:
          tasks.value = [
            useTask(getMessage),
            useTask(getVoucher),
            useTask(execMint),
            useTask(getToken),
          ];
          break;
        case false:
          tasks.value = [useTask(execMint), useTask(getToken)];
          break;
      }
  },
  { deep: true }
);

const reset = () => {
  setTimeout(() => {
    tokens.value = [];
    tasks.value = [];
  }, 500);
};
</script>
