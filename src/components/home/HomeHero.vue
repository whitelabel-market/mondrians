<template>
  <section class="mondrian-border-b">
    <div
      class="relative grid items-center max-w-6xl mx-auto -mt-10 md:-mt-0 lgs:grid-cols-2"
    >
      <img
        src="@/assets/images/image-1.png"
        alt="Magic Mondrian"
        class="animate"
      />
      <PreSale
        v-if="presaleEnabled || revealEnabled"
        :revealEnabled="revealEnabled"
        :loaded="loaded"
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
  </section>
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

defineProps({
  loaded: {
    type: Boolean,
    required: true,
  },
});

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
