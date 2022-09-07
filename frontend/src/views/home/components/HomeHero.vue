<template>
  <section
    class="transition-colors duration-200 bg-white mondrian-border-b dark:bg-neutral-900 !py-0"
  >
    <div
      class="relative z-10 grid items-center max-w-6xl mx-auto min-h-screen pb-20 pt-40 lgs:grid-cols-2"
    >
      <template v-if="loaded">
        <img src="@/assets/images/image-1.png" alt="Magic Mondrian" v-animate />

        <SaleOpen
          v-if="whitelistEnabled || publicsaleEnabled"
          v-model="quantity"
          :whitelistEnabled="whitelistEnabled"
          :contract="contract"
          @mint="mintIfConnected"
        />
        <SaleClosed
          v-else
          :loaded="loaded"
          :soldOut="contract.maxSupply === contract.totalSupply"
        />
      </template>
    </div>
  </section>
  <MamoConnectWalletModal v-model="showConnectModal" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useWallet } from "@whitelabel-solutions/wallet-connector-vue";
import SaleClosed from "@/views/home/components/SaleClosed.vue";
import SaleOpen from "@/views/home/components/SaleOpen.vue";
import { MamoConnectWalletModal } from "@/components/WalletModal";
import { useFlag } from "@/composables/useFlags";
import useContract from "@/composables/useContract";
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
