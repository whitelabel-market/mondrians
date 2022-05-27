<template>
  <AppModal
    :modelValue="modelValue"
    @update:modelValue="
      ($event) => {
        $emit('update:modelValue', $event);
        disconnect();
      }
    "
  >
    <AppLoadingSpinner class="mx-auto" />
    <h3
      class="text-2xl font-bold text-center text-neutral-900 dark:text-neutral-200"
    >
      Wrong network
    </h3>
    <p class="leading-tight text-center text-neutral-900 dark:text-neutral-200">
      Looks like you connected to an unsupported network. Change network to
      {{ NETWORK_NAME[0].toUpperCase() + NETWORK_NAME.slice(1) }}.
    </p>
    <AppButton
      :fullWidth="true"
      @click.prevent="changeNetwork()"
      class="outline-none focus:outline-none"
      >Change network</AppButton
    >
    <template v-slot:button>Logout</template>
  </AppModal>
</template>

<script setup lang="ts">
import AppModal from "@/components/app/AppModal.vue";
import AppLoadingSpinner from "@/components/app/AppLoadingSpinner.vue";
import AppButton from "@/components/app/AppButton.vue";
import { useWallet } from "@/composables/useWallet";
import { NETWORK_NAME, CHAIN_ID } from "@/utils/constants";

defineEmits(["update:modelValue"]);

defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const { disconnect } = useWallet();

const changeNetwork = async () => {
  if ((window as any).ethereum) {
    try {
      // check if the chain to connect to is installed
      await (window as any).ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x" + CHAIN_ID.toString(16) }],
      });
    } catch (error: any) {
      // This error code indicates that the chain has not been added to MetaMask
      // if it is not, then install it into the user MetaMask
      if (error.code === 4902) {
        try {
          await (window as any).ethereum.request({
            jsonrpc: "2.0",
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x" + CHAIN_ID.toString(16),
                rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
                chainName: "Mumbai",
                nativeCurrency: {
                  name: "MATIC",
                  symbol: "MATIC", // 2-6 characters long
                  decimals: 18,
                },
                blockExplorerUrls: ["https://mumbai.polygonscan.com"],
              },
            ],
          });
        } catch (addError) {
          console.error(addError);
        }
      }
      console.error(error);
    }
  } else {
    // if metamask is not installed
    throw new Error(
      "MetaMask is not installed. Please consider installing it: https://metamask.io/download.html"
    );
  }
};
</script>
