<template>
  <div>
    <LayoutChangeNetworkModal v-model="wrongNetwork" />
    <div class="relative flex flex-col min-h-screen mx-auto">
      <LayoutFrame class="z-90" />
      <LayoutHeader
        class="transition-colors duration-100 bg-white z-80 dark:bg-neutral-900"
      />
      <div
        v-if="!loaded"
        class="fixed z-30 flex items-center justify-center w-full h-screen bg-white dark:bg-neutral-900"
      >
        <LoadingMondrian class="w-10 h-10" />
      </div>
      <main class="flex flex-col justify-center flex-1 w-full">
        <router-view @loaded="loaded = $event" />
      </main>
      <LayoutFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import LayoutFooter from "@/components/layouts/LayoutFooter.vue";
import LayoutHeader from "@/components/layouts/LayoutHeader.vue";
import LayoutFrame from "@/components/layouts/LayoutFrame.vue";
import LayoutChangeNetworkModal from "@/components/layouts/LayoutChangeNetworkModal.vue";
import LoadingMondrian from "@/components/icons/LoadingMondrian.vue";
import { useWallet } from "@whitelabel-solutions/wallet-connector-vue";

const { activeChainId } = useWallet();
const loaded = ref(false);

const wrongNetwork = computed(() => {
  if (activeChainId.value) {
    return activeChainId.value !== 80001;
  }
  return false;
});
</script>

<style>
/* Change Autocomplete styles in Chrome*/
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  -webkit-text-fill-color: #e5e5e5;
  -webkit-box-shadow: 0 0 0px 1000px #262626 inset;
  box-shadow: 0 0 0px 1000px #262626 inset;
  transition: background-color 5000s ease-in-out 0s;
  color: #e5e5e5;
}
</style>
