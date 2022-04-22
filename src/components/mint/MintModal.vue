<template>
  <AppModal
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
  >
    <MintProgress
      v-if="!tokens.length"
      :phase="phase"
      :tasks="tasks"
      @update:modelValue="$emit('update:modelValue', $event)"
    />
    <MintSuccess
      v-else
      :tokens="tokens"
      @update:modelValue="$emit('update:modelValue', $event)"
    />
  </AppModal>
</template>

<script lang="ts">
import { defineComponent, ref, toRaw } from "vue";
import MintProgress from "@/components/mint/MintProgress.vue";
import MintSuccess from "@/components/mint/MintSuccess.vue";
import AppModal from "@/components/app/AppModal.vue";
import { createAuthInterface } from "@/services/AuthInterface";
import { useWallet } from "@/composables/useWallet";
import MondrianInterface from "@/services/MondrianInterface";
import { Phase } from "@/composables/useContract";
import useTask from "@/composables/useTask";
import { ethers } from "ethers";
import { MAMO_SUBGRAPH } from "@/utils/constants";
import { useFetch } from "@vueuse/core";

export default defineComponent({
  components: {
    AppModal,
    MintSuccess,
    MintProgress,
  },
  props: {
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
    phase: {
      type: String,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  setup(props) {
    const { address, provider, signMessage } = useWallet();
    const tokens: any = ref([]);
    const tasks = ref<any[]>([]);

    const getMessage = function* (): any {
      const authInterface = createAuthInterface(address.value);
      const message = yield authInterface.login();
      const signature = yield signMessage(message);
      return yield authInterface.callback(signature);
    };

    const getVoucher = function* (): any {
      const authInterface = createAuthInterface(address.value);
      return yield authInterface.getVoucher();
    };

    const execMint = function* (signal: any, voucher: string): any {
      const mondrianInterface = new MondrianInterface(
        toRaw(provider.value as ethers.providers.Web3Provider)
      );
      return yield mondrianInterface.mint(props.quantity, props.price, voucher);
    };

    const timeout = (time: number) => {
      return new Promise((resolve) => setTimeout(resolve, time));
    };

    const getToken = function* (
      signal: any,
      tx: ethers.ContractTransaction
    ): any {
      //const block = tx.blockNumber;
      while (true) {
        const { data } = yield useFetch(MAMO_SUBGRAPH)
          .post(
            JSON.stringify({
              query: `query GetTokensFromBlock($address: String = "", $block: Int = 0) {
              tokens(where: { owner: $address, createdAtBlockNumber: $block }) {
                id
                imageURI
                createdAtTimestamp
                createdAtBlockNumber
                transactionHash
              }
            }`,
              variables: {
                address: "0xe3bbf29f034fa780407fd11dac7a0b3938b1bc6a",
                block: 12195294,
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

    const mint = async () => {
      switch (props.phase) {
        case Phase[1]:
          tasks.value = [
            useTask(getMessage),
            useTask(getVoucher),
            useTask(execMint),
            useTask(getToken),
          ];
          break;
        case Phase[2]:
          tasks.value = [useTask(getToken)];
          break;
      }
    };

    return { mint, tokens, tasks };
  },
});
</script>
