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
      <SaleClosed
        v-if="currentPhase === Phase.PreSale || currentPhase == Phase.Reveal"
        :revealEnabled="currentPhase === Phase.Reveal"
        :loaded="loaded"
      />
      <SaleOpen
        v-if="
          currentPhase === Phase.WhitelistSale ||
          currentPhase == Phase.PublicSale
        "
        :price="currentPhase === Phase.WhitelistSale ? '0.00025' : '0.005'"
        :whitelistEnabled="currentPhase === Phase.WhitelistSale"
        :publicsaleEnabled="currentPhase === Phase.PublicSale"
        :quantity="quantity"
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
    :price="currentPhase === Phase.WhitelistSale ? '0.00025' : '0.005'"
  />
  <LayoutConnectModal
    v-model="showConnectModal"
    @connected="connected = true"
  />
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import SaleClosed from "@/components/phase/SaleClosed.vue";
import SaleOpen from "@/components/phase/SaleOpen.vue";
import MintModal from "@/components/mint/MintModal.vue";
import LayoutConnectModal from "@/components/wallet-connect/WalletConnectModal.vue";
import useContract from "@/composables/useContract";
import { useWallet } from "@whitelabel-solutions/wallet-connector-vue";
import { useFlag } from "@/composables/useFlags";

defineProps({
  loaded: {
    type: Boolean,
    required: true,
  },
});

// modal handling

const modelValue = ref(false);
const showConnectModal = ref(false);
const connected = ref(false);
const quantity = ref(1);
const { contract } = useContract();
const { isConnected } = useWallet();

// phase handling

enum Phase {
  PreSale = "presale",
  WhitelistSale = "whitelistsale",
  PublicSale = "publicsale",
  Reveal = "reveal",
}

const presaleEnabled = useFlag(Phase.PreSale);
const whitelistEnabled = useFlag(Phase.WhitelistSale);
const publicsaleEnabled = useFlag(Phase.PublicSale);
const revealEnabled = useFlag(Phase.Reveal);

const currentPhase = computed(() => {
  if (revealEnabled.value) return Phase.Reveal;
  if (publicsaleEnabled.value) return Phase.PublicSale;
  if (whitelistEnabled.value) return Phase.WhitelistSale;
  if (presaleEnabled.value) return Phase.PreSale;
  return "";
});
</script>
