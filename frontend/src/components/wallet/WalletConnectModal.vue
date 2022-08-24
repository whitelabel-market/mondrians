<template>
  <AppModal
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
  >
    <div v-if="!loading" class="flex flex-col w-full p-4 space-y-4 md:p-8">
      <h3 class="text-2xl font-bold text-center text-color">Select wallet</h3>
      <ul class="space-y-4">
        <li v-for="(provider, i) of providers" :key="i">
          <AppButton
            :fullWidth="true"
            @click="tryConnect(provider)"
            :center="false"
            class="flex items-center justify-between outline-none focus:outline-none"
          >
            <span class="block font-semibold text-left">{{
              provider.name
            }}</span>
            <g v-html="provider.logo" id="logo"></g>
          </AppButton>
        </li>
      </ul>
    </div>
  </AppModal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import AppModal from "@/components/app/AppModal.vue";
import AppButton from "@/components/app/AppButton.vue";
import {
  Providers,
  useWallet,
} from "@whitelabel-solutions/wallet-connector-vue";
import type { IProvider } from "@whitelabel-solutions/wallet-connector-vue";

const emits = defineEmits(["update:modelValue", "connected"]);

defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const { connect } = useWallet();

const { MetaMaskProvider, WalletLinkProvider, WalletConnectProvider } =
  Providers;
const providers = [MetaMaskProvider, WalletLinkProvider, WalletConnectProvider];
const loading = ref(false);

const tryConnect = async (provider: IProvider) => {
  await connect(provider);
  emits("update:modelValue", false);
  emits("connected");
};
</script>

<style>
#logo svg {
  @apply w-6 h-6;
}
</style>
