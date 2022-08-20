<template>
  <section
    class="transition-colors duration-200 bg-white mondrian-border-b dark:bg-neutral-900"
  >
    <div
      class="relative z-10 grid items-center max-w-6xl mx-auto mt-8 md:-mt-0 lgs:grid-cols-2"
    >
      <img src="@/assets/images/image-1.png" alt="Magic Mondrian" />
      <SaleOpen
        v-if="whitelistEnabled || publicsaleEnabled"
        v-model="quantity"
        :whitelistEnabled="whitelistEnabled"
        :contract="contract"
        @mint="mintIfConnected"
      />
      <SaleClosed
        v-else
        :soldOut="contract.maxSupply === contract.totalSupply"
        :loaded="loaded"
      />
    </div>
  </section>
  <LayoutConnectModal v-model="showConnectModal" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import SaleClosed from "@/components/phase/SaleClosed.vue";
import SaleOpen from "@/components/phase/SaleOpen.vue";
import LayoutConnectModal from "@/components/wallet/WalletConnectModal.vue";
import useContract from "@/composables/useContract";
import { useWallet } from "@whitelabel-solutions/wallet-connector-vue";
import { useFlag } from "@/composables/useFlags";
import { useRouter } from "vue-router";
import { SalePhase } from "@/utils/constants/mint";

defineProps({
  loaded: {
    type: Boolean,
    required: true,
  },
});

const router = useRouter();
const { contract } = useContract();
const { isConnected } = useWallet();

const [whitelistEnabled, publicsaleEnabled] = [
  SalePhase.WhitelistSale,
  SalePhase.PublicSale,
].map(useFlag);

const showConnectModal = ref(false);
const quantity = ref(1);

const mintIfConnected = (event: number) => {
  return isConnected.value
    ? router.push({ name: "Mint", query: { quantity: event } })
    : (showConnectModal.value = true);
};
</script>
