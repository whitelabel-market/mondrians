<template>
  <header class="mondrian-border-b">
    <div
      class="relative min-h-screen grid lgs:grid-cols-2 items-center max-w-6xl mx-auto py-20 -my-12"
    >
      <img src="@/assets/images/image-1.png" alt="Magic Mondrian" class="" />
      <PreSale
        v-if="presaleEnabled || revealEnabled"
        :revealEnabled="revealEnabled"
      />
      <SaleOpen
        v-if="whitelistEnabled || publicsaleEnabled"
        :price="getPrice"
        :whitelistEnabled="whitelistEnabled"
        :publicsaleEnabled="publicsaleEnabled"
        :quantity="quantity"
        :can-decrease="canDecrease"
        :can-increase="canIncrease"
        :contract="contract"
        :is-connected="isConnected"
        @increase="quantity++"
        @decrease="quantity--"
        @update:modelValue="modelValue = true"
        @update:showConnectModal="showConnectModal = true"
      />
    </div>
  </header>
  <MintModal
    v-model="modelValue"
    :whitelistEnabled="whitelistEnabled"
    :quantity="quantity"
    :price="getPrice"
  />
  <LayoutConnectModal
    v-model="showConnectModal"
    @connected="connected = true"
  />
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import PreSale from "@/components/phase/PreSale.vue";
import SaleOpen from "@/components/phase/SaleOpen.vue";
import MintModal from "@/components/mint/MintModal.vue";
import LayoutConnectModal from "@/components/wallet-connect/WalletConnectModal.vue";
import useContract from "@/composables/useContract";
import { useWallet } from "@/composables/useWallet";

const modelValue = ref(false);
const showConnectModal = ref(false);
const connected = ref(false);
const quantity = ref(1);
const {
  presaleEnabled,
  whitelistEnabled,
  publicsaleEnabled,
  revealEnabled,
  getPrice,
  contract,
  getMaxMint,
} = useContract();
const { isConnected, address } = useWallet();

const canDecrease = computed(() => quantity.value > 0);
const canIncrease = computed(() => quantity.value < getMaxMint.value);

watch(address, () => {
  if (connected.value) {
    modelValue.value = true;
  }
});
</script>
