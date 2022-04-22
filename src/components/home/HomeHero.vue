<template>
  <section class="pt-12 pb-16 md:py-24">
    <div
      class="lgs:flex items-center max-w-[61rem] mx-auto relative lgs:-left-[2.625rem]"
    >
      <img
        src="../../assets/images/image-1.png"
        alt=""
        class="mx-auto lgs:mx-0"
        width="560"
      />
      <PreSale v-if="getPhase === 'PreSale'" :max-supply="contract.maxSupply" />
      <SaleOpen
        v-if="getPhase === 'WhitelistSale' || getPhase === 'PublicSale'"
        :price="getPrice"
        :quantity="quantity"
        :can-decrease="canDecrease"
        :can-increase="canIncrease"
        :contract="contract"
        :is-connected="isConnected"
        @increase="quantity++"
        @decrease="quantity--"
        @update:modelValue="modelValue = true"
      />
    </div>
  </section>
  <MintModal
    v-model="modelValue"
    :phase="getPhase"
    :quantity="quantity"
    :price="getPrice"
  />
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import PreSale from "@/components/phase/PreSale.vue";
import SaleOpen from "@/components/phase/SaleOpen.vue";
import MintModal from "@/components/mint/MintModal.vue";
import useContract from "@/composables/useContract";
import { useWallet } from "@/composables/useWallet";

const modelValue = ref(false);
const quantity = ref(1);
const { getPrice, getPhase, contract } = useContract();
const { isConnected } = useWallet();

const canDecrease = computed(() => quantity.value > 0);
const canIncrease = computed(() => quantity.value < contract.value.maxMint);
</script>
