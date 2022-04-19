<template>
  <AppModal
    :modelValue="modelValue"
    @update:modelValue="
      $emit('update:modelValue', $event);
      reset();
    "
  >
    <MintProgress
      v-if="!tokens.length"
      :phase="phase"
      :steps="steps"
      @update:modelValue="
        $emit('update:modelValue', $event);
        reset();
      "
    />
    <MintSuccess
      v-else
      :tokens="tokens"
      @update:modelValue="
        $emit('update:modelValue', $event);
        reset();
      "
    />
  </AppModal>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRaw, watch } from "vue";
import MintProgress from "@/components/mint/MintProgress.vue";
import MintSuccess from "@/components/mint/MintSuccess.vue";
import AppModal from "@/components/app/AppModal.vue";
import { createAuthInterface } from "@/services/AuthInterface";
import { useWallet } from "@/composables/useWallet";
import MondrianInterface from "@/services/MondrianInterface";
import { getTokensFromBlock } from "@/services/graphql/types";
import { useQuery, useResult } from "@vue/apollo-composable";
import { Phase } from "@/composables/useContract";

enum Status {
  SCHEDULED = "scheduled",
  PENDING = "pending",
  SUCCESS = "success",
  ERROR = "error",
}

type Step = {
  name: string;
  description: string;
  status: Status;
};

type MintSteps = {
  WhitelistSale: Array<Step>;
  PublicSale: Array<Step>;
};

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

    const steps: MintSteps = reactive({
      WhitelistSale: [
        {
          name: "Authenticate",
          description: "Authenticate with address for Whitelist Sale",
          status: Status.SCHEDULED,
        },
        {
          name: "Voucher",
          description: "Check if address is eligible for Whitelist Sale",
          status: Status.SCHEDULED,
        },
        {
          name: "Mint",
          description: "Create your Magic Mondrian tokens",
          status: Status.SCHEDULED,
        },
        {
          name: "Load",
          description: "Load your tokens",
          status: Status.SCHEDULED,
        },
      ],
      PublicSale: [
        {
          name: "Mint",
          description: "Create your Magic Mondrian tokens",
          status: Status.SCHEDULED,
        },
        {
          name: "Load",
          description: "Load your tokens",
          status: Status.SCHEDULED,
        },
      ],
    });

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

    watch(response, () => {
      if (response.value.length > 0) {
        tokens.value = response.value;
        steps[props.phase as keyof MintSteps][
          props.phase === Phase[1] ? 3 : 1
        ].status = Status.SUCCESS;
      } else {
        setTimeout(() => refetch(), 5000);
      }
    });

    const reset = () => {
      setTimeout(() => {
        enabled.value = false;
        block.value = 0;
        steps[props.phase as keyof MintSteps].forEach(
          (step) => (step.status = Status.SCHEDULED)
        );
        tokens.value = [];
      }, 500);
    };

    const mint = async (quantity: number) => {
      const phase = props.phase;
      const mondrianInterface = provider.value
        ? new MondrianInterface(toRaw(provider.value))
        : null;
      if (mondrianInterface) {
        const authInterface = createAuthInterface(address.value);

        try {
          // Whitelist Sale
          if (Object.keys(steps).indexOf(phase) === 0) {
            steps[phase as keyof MintSteps][0].status = Status.PENDING;
            // Auth
            const message = await authInterface.login();
            const signature = await signMessage(message);
            await authInterface.callback(signature);
            steps[phase as keyof MintSteps][0].status = Status.SUCCESS;
            steps[phase as keyof MintSteps][1].status = Status.PENDING;
            // Voucher
            const voucher = await authInterface.getVoucher();
            steps[phase as keyof MintSteps][1].status = Status.SUCCESS;
            steps[phase as keyof MintSteps][2].status = Status.PENDING;
            // Whitelist Mint
            const tx = await mondrianInterface.mint(
              quantity,
              props.price,
              voucher
            );
            steps[phase as keyof MintSteps][2].status = Status.SUCCESS;
            steps[phase as keyof MintSteps][3].status = Status.PENDING;
            // Load from indexer
            block.value = tx.blockNumber;
            enabled.value = true;
            refetch();
          } else {
            // Public Sale
            steps[phase as keyof MintSteps][0].status = Status.PENDING;
            const tx = await mondrianInterface.mint(quantity, props.price);
            steps[phase as keyof MintSteps][0].status = Status.SUCCESS;
            steps[phase as keyof MintSteps][1].status = Status.PENDING;
            // Load from indexer
            block.value = tx.blockNumber;
            enabled.value = true;
            refetch();
          }
        } catch (e: any) {
          throw new Error(e.toString());
        }
      }
    };

    return { mint, reset, steps, tokens };
  },
});
</script>
