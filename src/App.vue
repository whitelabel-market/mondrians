<template>
  <div class="flex flex-col min-h-screen">
    <LayoutHeader class="z-50" />
    <div
      v-if="!contract.name"
      class="fixed z-40 flex items-center justify-center w-full h-screen bg-white"
    >
      <AppLoadingSpinner :size="'lg'" />
    </div>
    <main class="flex flex-col justify-center flex-1 w-full">
      <router-view />
    </main>
    <LayoutFooter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LayoutFooter from "@/components/layouts/LayoutFooter.vue";
import LayoutHeader from "@/components/layouts/LayoutHeader.vue";
import { useWalletProvider } from "@/composables/useWallet";
import AppLoadingSpinner from "@/components/app/AppLoadingSpinner.vue";
import useContract from "@/composables/useContract";

export default defineComponent({
  components: { LayoutHeader, LayoutFooter, AppLoadingSpinner },
  setup() {
    useWalletProvider();
    const { contract } = useContract();
    return { contract };
  },
});
</script>
