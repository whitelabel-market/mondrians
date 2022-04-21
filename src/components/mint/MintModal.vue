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
import { defineComponent, ref } from "vue";
import MintProgress from "@/components/mint/MintProgress.vue";
import MintSuccess from "@/components/mint/MintSuccess.vue";
import AppModal from "@/components/app/AppModal.vue";
import { createAuthInterface } from "@/services/AuthInterface";
import { useWallet } from "@/composables/useWallet";
import MondrianInterface from "@/services/MondrianInterface";
import { getTokensFromBlock } from "@/services/graphql/types";
import { useQuery, useResult } from "@vue/apollo-composable";
import { Phase } from "@/composables/useContract";
import useTask from "@/composables/useTask";

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
    phase: {
      type: String,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  setup(props) {
    const { address, provider, signMessage } = useWallet();
    const enabled = ref(false);
    const tokens: any = ref([]);
    const block = ref(0);
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

    const { result, refetch } = useQuery(
      getTokensFromBlock,
      () => ({
        address: address.value,
        block: block.value,
      }),
      () => ({
        enabled: enabled.value,
        fetchPolicy: "cache-and-network",
      })
    );

    const response = useResult(result, null, (data) => data.tokens);

    const mint = async (quantity: number) => {
      tasks.value = [useTask(getMessage), useTask(getVoucher)];
      // const phase = props.phase;
      // const mondrianInterface = provider.value
      //   ? new MondrianInterface(toRaw(provider.value))
      //   : null;
      // if (mondrianInterface) {
      //   const authInterface = createAuthInterface(address.value);

      //   try {
      //     // Whitelist Sale
      //     if (false) {
      //       // steps[phase as keyof MintSteps][0].status = Status.PENDING;
      //       // // Auth
      //       // const message = await authInterface.login();
      //       // const signature = await signMessage(message);
      //       // await authInterface.callback(signature);
      //       // steps[phase as keyof MintSteps][0].status = Status.SUCCESS;
      //       // steps[phase as keyof MintSteps][1].status = Status.PENDING;
      //       // // Voucher
      //       // const voucher = await authInterface.getVoucher();
      //       // steps[phase as keyof MintSteps][1].status = Status.SUCCESS;
      //       // steps[phase as keyof MintSteps][2].status = Status.PENDING;
      //       // // Whitelist Mint
      //       // const tx = await mondrianInterface.mint(
      //       //   quantity,
      //       //   props.price,
      //       //   voucher
      //       // );
      //       // steps[phase as keyof MintSteps][2].status = Status.SUCCESS;
      //       // steps[phase as keyof MintSteps][3].status = Status.PENDING;
      //       // // Load from indexer
      //       // block.value = tx.blockNumber;
      //       // enabled.value = true;
      //       // refetch();
      //     } else {
      //       // Public Sale
      //       tasks.value = [useTask(getMessage)];
      //       // steps[phase as keyof MintSteps][0].status = Status.PENDING;
      //       // const tx = await mondrianInterface.mint(quantity, props.price);
      //       // steps[phase as keyof MintSteps][0].status = Status.SUCCESS;
      //       // steps[phase as keyof MintSteps][1].status = Status.PENDING;
      //       // // Load from indexer
      //       // block.value = tx.blockNumber;
      //       // enabled.value = true;
      //       // refetch();
      //     }
      //   } catch (e: any) {
      //     throw new Error(e.toString());
      //   }
    };

    return { mint, tokens, tasks };
  },
});
</script>
