<template>
  <div>
    <LayoutChangeNetworkModal v-model="wrongNetwork" />
    <div class="relative flex flex-col min-h-screen mx-auto">
      <LayoutFrame class="z-90" />
      <LayoutHeader
        class="transition-colors duration-300 bg-white z-80 dark:bg-neutral-900"
      />
      <div
        v-if="!loaded"
        class="fixed z-30 flex items-center justify-center w-full h-screen bg-white dark:bg-neutral-900"
      >
        <AppLoadingSpinner :size="'lg'" />
      </div>
      <main
        class="flex flex-col justify-center flex-1 w-full transition-colors duration-300 bg-white dark:bg-neutral-900"
      >
        <router-view @loaded="loaded = $event" />
      </main>
      <div>
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
    return network.value.name !== NETWORK_NAME;
  }
  return false;
});
</script>
