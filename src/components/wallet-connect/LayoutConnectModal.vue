<template>
  <AppModal
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
  >
    <div class="space-y-4">
      <div class="p-4">
        <h3 class="text-xl font-bold text-center">
          Please Connect your Wallet
        </h3>
      </div>

      <ul class="flex flex-col p-4 space-y-4">
        <li
          v-for="(p, i) of providers.slice(
            0,
            providersCollapsed ? providers.length : 3
          )"
          :key="i"
          class="flex justify-center w-full"
        >
          <button
            class="inline-block px-8 py-2 mx-auto text-lg font-semibold text-center bg-yellowish rounded-xl"
            @click.prevent="connectTo(p)"
          >
            {{ p.name }}
          </button>
        </li>
        <li class="flex justify-center w-full">
          <button
            class="px-8 py-2 text-lg text-center"
            @click.prevent="providersCollapsed = !providersCollapsed"
          >
            {{
              providersCollapsed ? "Show fewer options" : "Show more options"
            }}
          </button>
        </li>
      </ul>
    </div>
  </AppModal>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import AppModal from "@/components/app/AppModal.vue";
import Connector from "@/libs/@walletConnector";
import { useWalletStore } from "@/store/useWallet";
import type { IProvider } from "@/libs/@walletConnector/types";

export default defineComponent({
  components: {
    AppModal,
  },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  setup(_, { emit }) {
    const wallet = useWalletStore();

    const providers = Connector.init({
      appName: "Mondrians",
      infuraId: "",
      authereum: { key: "" },
      fortmatic: { key: "" },
    }).providers;

    const providersCollapsed = ref(false);

    const connectTo = async (provider: IProvider) => {
      await wallet.connect(provider);
      emit("update:modelValue", false);
    };

    return { connectTo, providersCollapsed, providers, wallet };
  },
});
</script>
