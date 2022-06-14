<template>
  <div class="flex flex-col justify-center items-center">
    <MintSettings
      v-model="quantity"
      :whitelistEnabled="whitelistEnabled"
      @mint="mintIfConnected"
    />
  </div>

  <LayoutConnectModal v-model="showConnectModal" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import LayoutConnectModal from "@/components/wallet-connect/WalletConnectModal.vue";
import useContract from "@/composables/useContract";
import { useWallet } from "@whitelabel-solutions/wallet-connector-vue";
import { useFlag } from "@/composables/useFlags";
import { SalePhase } from "@/utils/constants/mint";
import MintSettings from "@/components/mint/MintSettings.vue";

const { contract } = useContract();
const { isConnected } = useWallet();

const whitelistEnabled = useFlag(SalePhase.WhitelistSale);

const showConnectModal = ref(false);
const quantity = ref(1);

const mintIfConnected = (event: number) => {
  return isConnected.value
    ? console.log("mint finish", event)
    : (showConnectModal.value = true);
};
</script>
