<template>
  <div>
    <LayoutChangeNetworkModal v-model="wrongNetwork" />

    <div class="flex flex-col min-h-screen mx-auto relative">
      <LayoutFrame class="z-90" />
      <LayoutHeader class="z-80" />
      <div
        v-if="!loaded"
        class="fixed z-30 flex items-center justify-center w-full h-screen bg-white dark:bg-neutral-900 transition-colors duration-300"
      >
        <AppLoadingSpinner :size="'lg'" />
      </div>
      <main
        class="flex flex-col justify-center flex-1 w-full bg-white dark:bg-neutral-900 transition-colors duration-300"
      >
        <router-view @loaded="loaded = true" />
      </main>
      <div class="bg-white dark:bg-neutral-900 transition-colors duration-300">
        <LayoutFooter />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import LayoutFooter from "@/components/layouts/LayoutFooter.vue";
import LayoutHeader from "@/components/layouts/LayoutHeader.vue";
import LayoutFrame from "@/components/layouts/LayoutFrame.vue";
import LayoutChangeNetworkModal from "@/components/layouts/LayoutChangeNetworkModal.vue";

import AppLoadingSpinner from "@/components/app/AppLoadingSpinner.vue";
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
