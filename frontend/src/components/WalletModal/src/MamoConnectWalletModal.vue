<template>
  <MamoModal
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
  >
    <div v-if="!loading" class="flex flex-col w-full p-4 space-y-4 md:p-8">
      <h3 class="text-2xl font-bold text-center text-color">Select wallet</h3>
      <ul class="space-y-4">
        <li v-for="(provider, i) of providers" :key="i">
          <MamoButton
            :fullWidth="true"
            @click="tryConnect(provider)"
            :center="false"
            class="flex items-center justify-between outline-none focus:outline-none"
          >
            <span class="block font-semibold text-left">{{
              provider.name
            }}</span>
            <g v-html="provider.logo" id="logo"></g>
          </MamoButton>
        </li>
      </ul>
    </div>
  </MamoModal>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { MamoModal } from "@/components/Modal";
import { MamoButton } from "@/components/Button";
import { Providers } from "@whitelabel-solutions/wallet-connector-vue";
import type { IProvider } from "@whitelabel-solutions/wallet-connector-vue";
import { useUserStore } from "@/store/modules/user";
import { useAppStore } from "@/store/modules/app";

const emits = defineEmits(["update:modelValue"]);
defineProps(["modelValue"]);

const { setShowMobileMenu } = useAppStore();
const { connectWallet } = useUserStore();

const { MetaMaskProvider, WalletLinkProvider, WalletConnectProvider } =
  Providers;
const providers = [MetaMaskProvider, WalletLinkProvider, WalletConnectProvider];
const loading = ref(false);

const tryConnect = async (provider: IProvider) => {
  await connectWallet(provider);
  emits("update:modelValue", false);
  setShowMobileMenu(false);
};
</script>

<style lang="postcss">
#logo svg {
  @apply w-6 h-6;
}
</style>
