<template>
  <div>
    <LayoutLoader />
    <LayoutFrame />
    <LayoutNetworkModal v-model="wrongNetwork" />
    <LayoutNotification />

    <div class="relative flex flex-col min-h-screen mx-auto">
      <LayoutHeader />
      <LayoutBody />
      <LayoutFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { LayoutHeader } from "./src/Header";
import { LayoutBody } from "./src/Body";
import { LayoutFooter } from "./src/Footer";
import { LayoutFrame } from "./src/Frame";
import { LayoutNotification } from "./src/Notification";
import { LayoutLoader } from "./src/Loader";
import { LayoutNetworkModal } from "./src/NetworkModal";
import { computed } from "vue";
import { useWallet } from "@whitelabel-solutions/wallet-connector-vue";
import CONFIG from "@/../../config";

const { activeChainId } = useWallet();
const wrongNetwork = computed(() => {
  if (activeChainId.value) {
    return activeChainId.value !== CONFIG.chainList.chainId;
  }
  return false;
});
</script>
