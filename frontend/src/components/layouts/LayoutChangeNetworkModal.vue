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
      {{ chain.title }}.
    </p>
    <AppButton
      :fullWidth="true"
      @click.prevent="changeNetwork()"
      class="outline-none focus:outline-none"
      >Change network</AppButton
    >
  </AppModal>
</template>

<script setup lang="ts">
import AppModal from "@/components/app/AppModal.vue";
import AppLoadingSpinner from "@/components/app/AppLoadingSpinner.vue";
import AppButton from "@/components/app/AppButton.vue";
import { useWallet } from "@whitelabel-solutions/wallet-connector-vue";
import CONFIG from "@/../../config";

defineEmits(["update:modelValue"]);

defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const { disconnect, provider } = useWallet();

const toHex = (num: number) => {
  return "0x" + num.toString(16);
};

const chain = CONFIG.chainList;

const changeNetwork = async () => {
  if ((window as any).ethereum) {
    try {
      // check if the chain to connect to is installed
      await provider.value?.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x" + chain.chainId.toString(16) }],
      });
    } catch (error: any) {
      // This error code indicates that the chain has not been added to MetaMask
      // if it is not, then install it into the user MetaMask
      if (error?.code === 4902 || error?.data?.originalError?.code === 4902) {
        try {
          await provider.value?.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: toHex(chain.chainId), // A 0x-prefixed hexadecimal string
                chainName: chain.name,
                nativeCurrency: {
                  name: chain.nativeCurrency.name,
                  symbol: chain.nativeCurrency.symbol, // 2-6 characters long
                  decimals: chain.nativeCurrency.decimals,
                },
                rpcUrls: chain.rpc,
                blockExplorerUrls: [
                  chain.explorers &&
                  chain.explorers.length > 0 &&
                  chain.explorers[0].url
                    ? chain.explorers[0].url
                    : chain.infoURL,
                ],
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
