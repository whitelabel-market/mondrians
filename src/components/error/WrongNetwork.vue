<template>
  <AppModal :modelValue="modelValue">
    <div class="flex flex-col gap-4 w-80">
      <AppLoadingSpinner :size="'md'" />
      <h3 class="text-lg font-bold leading-5 text-center">Wrong network</h3>
      <p class="text-sm text-center text-gray-700 fomt-medium">
        Looks like you connected to an unsupported network. Change network to
        Ropste.
      </p>
      <div class="flex flex-col gap-2">
        <AppButton :size="'sm'" @click.prevent="changeNetwork()"
          >Change network</AppButton
        >
        <AppButton
          :color="'secondary'"
          :size="'sm'"
          @click.prevent="disconnect()"
          >Logout</AppButton
        >
      </div>
    </div>
  </AppModal>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import AppModal from "@/components/app/AppModal.vue";
import AppLoadingSpinner from "@/components/app/AppLoadingSpinner.vue";
import AppButton from "@/components/app/AppButton.vue";
import { useWallet } from "@/composables/useWallet";

export default defineComponent({
  components: {
    AppModal,
    AppLoadingSpinner,
    AppButton,
  },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  setup() {
    const { disconnect } = useWallet();

    const changeNetwork = async () => {
      if (window.ethereum) {
        try {
          // check if the chain to connect to is installed
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x3" }],
          });
        } catch (error: any) {
          // This error code indicates that the chain has not been added to MetaMask
          // if it is not, then install it into the user MetaMask
          if (error.code === 4902) {
            try {
              await window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: "0x3",
                    rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545/",
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

    return { changeNetwork, disconnect };
  },
});
</script>
