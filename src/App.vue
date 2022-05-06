<template>
  <div class="flex flex-col min-h-screen mx-auto select-none relative">
    <div class="fixed z-100 h-screen w-full top-0 left-0 mondrian-border"></div>
    <LayoutHeader class="z-80" />
    <div
      v-if="!loaded"
      class="fixed z-30 flex items-center justify-center w-full h-screen bg-white"
    >
      <AppLoadingSpinner :size="'lg'" />
    </div>
    <main class="flex flex-col justify-center flex-1 w-full">
      <router-view @loaded="loaded = true" />
    </main>
    <LayoutFooter />
  </div>
  <WrongNetwork v-model="wrongNetwork" />
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import LayoutFooter from "@/components/layouts/LayoutFooter.vue";
import LayoutHeader from "@/components/layouts/LayoutHeader.vue";
import AppLoadingSpinner from "@/components/app/AppLoadingSpinner.vue";
import WrongNetwork from "@/components/error/WrongNetwork.vue";
import { useWallet } from "@/composables/useWallet";
import { NETWORK_NAME } from "@/utils/constants";

const { network } = useWallet();
const loaded = ref(false);

const wrongNetwork = computed(() => {
  if (network.value) {
    return window.ethereum && network.value.name !== NETWORK_NAME;
  }
  return false;
});
</script>
