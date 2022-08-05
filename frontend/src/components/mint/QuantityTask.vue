<template>
  <MintSettings
    :disabled="disabled"
    v-model="quantity"
    :whitelistEnabled="whitelistEnabled"
    @submit="submitOrConnect"
  />

  <LayoutConnectModal v-model="showConnectModal" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import LayoutConnectModal from "@/components/wallet/WalletConnectModal.vue";
import { useFlag } from "@/composables/useFlags";
import { SalePhase } from "@/utils/constants/mint";
import MintSettings from "@/components/mint/MintSettings.vue";
import { useWallet } from "@whitelabel-solutions/wallet-connector-vue";
import { useRoute } from "vue-router";

const whitelistEnabled = useFlag(SalePhase.WhitelistSale);
const { isConnected } = useWallet();

defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: { type: Boolean, default: false },
  error: { type: Error, default: null },
});

const emit = defineEmits(["submit"]);
const showConnectModal = ref(false);

const { query } = useRoute(); // or with a default value

const quantity = ref(Number(query.quantity) || 1);

const submitOrConnect = () => {
  if (isConnected.value) {
    emit("submit", quantity.value);
  } else {
    showConnectModal.value = true;
  }
};
</script>
