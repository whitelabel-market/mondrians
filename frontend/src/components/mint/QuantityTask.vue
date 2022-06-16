<template>
  <MintSettings
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    :whitelistEnabled="whitelistEnabled"
    @submit="emit('submit', modelValue)"
  />

  <LayoutConnectModal v-model="showConnectModal" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import LayoutConnectModal from "@/components/wallet-connect/WalletConnectModal.vue";
import { useFlag } from "@/composables/useFlags";
import { SalePhase } from "@/utils/constants/mint";
import MintSettings from "@/components/mint/MintSettings.vue";

const whitelistEnabled = useFlag(SalePhase.WhitelistSale);

defineProps({
  modelValue: { type: Number, default: 1 },
  loading: { type: Boolean, default: false },
  error: { type: Error, default: null },
});

const emit = defineEmits(["update:modelValue", "submit"]);
const showConnectModal = ref(false);
</script>
