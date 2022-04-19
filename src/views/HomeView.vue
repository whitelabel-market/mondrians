<template>
  <!-- <AppModal :modelValue="modelValue">
    <div class="flex flex-col space-y-4 w-80">
      <div class="flex flex-col items-center space-y-4">
        <div class="flex items-center space-x-2">
          <UserCircleIcon class="w-9 h-9" />
          <div class="flex flex-col">
            <span class="font-bold text-md slashed-zero"
              >0xe3bbf29...b1bc6a</span
            >
            <span class="text-xs font-medium text-gray-600"
              >Connected with MetaMask</span
            >
          </div>
        </div>
        <div class="flex items-center justify-between w-full">
          <span class="flex items-center text-xs font-medium text-gray-600"
            >View on etherscan <ExternalLinkIcon class="w-4 h-4 ml-1"
          /></span>
          <span class="flex items-center text-xs font-medium text-gray-600"
            >Copy address <ClipboardCopyIcon class="w-4 h-4 ml-1"
          /></span>
        </div>
      </div>
      <span class="text-sm font-bold">Connected</span>
      <div
        class="flex items-center justify-between p-3 border-2 bg-gray-50 rounded-xl"
      >
        <div class="flex items-center space-x-2">
          <div class="p-2 rounded-full bg-gray-50">
            <EthereumIcon class="w-6 h-6 inset-1/2" />
          </div>
          <div class="flex flex-col">
            <span class="text-sm font-bold slashed-zero"
              >0xe3bbf29...b1bc6a</span
            >
            <span class="text-xs font-bold text-gray-700">Ethereum $0.00</span>
          </div>
        </div>
        <ChevronDownIcon class="w-5 h-5" />
      </div>
      <span class="text-sm font-bold">Connected</span>
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <span>Img</span>
          <div class="flex flex-col">
            <span>Address</span>
            <span>Eth amount</span>
          </div>
        </div>
        <ChevronDownIcon class="w-5 h-5" />
      </div> -->
  <!-- <AppButton>Sign out</AppButton>
    </div>
  </AppModal> -->
  <HomeHero />
  <HomeAbout />
  <HomeItemGallery />
  <HomeRoadmap />
  <HomeRarity />
  <HomeInfo />
  <HomeFaq />
  <HomeCta />
  <WrongNetwork v-model="wrongNetwork" />
</template>

<script lang="ts">
import { defineComponent, watchEffect, unref, ref, computed } from "vue";
import HomeHero from "@/components/home/HomeHero.vue";
import HomeAbout from "@/components/home/HomeAbout.vue";
import HomeItemGallery from "@/components/home/HomeItemGallery.vue";
import HomeRoadmap from "@/components/home/HomeRoadmap.vue";
import HomeRarity from "@/components/home/HomeRarity.vue";
import HomeInfo from "@/components/home/HomeInfo.vue";
import HomeFaq from "@/components/home/HomeFaq.vue";
import HomeCta from "@/components/home/HomeCta.vue";
import { useQuery, useResult } from "@vue/apollo-composable";
import { CONTRACT_ADDRESS } from "@/utils/constants";
import { getContract } from "@/services/graphql/types";
import type { Contract } from "@/composables/useContract";
import useContract from "@/composables/useContract";
import EthereumInterface from "@/services/EthereumInterface";
import WrongNetwork from "@/components/error/WrongNetwork.vue";
// import AppModal from "@/components/app/AppModal.vue";
// import AppButton from "@/components/app/AppButton.vue";
// import { ChevronDownIcon, UserCircleIcon } from "@heroicons/vue/solid";
// import { ClipboardCopyIcon, ExternalLinkIcon } from "@heroicons/vue/outline";
// import EthereumIcon from "@/components/icons/EthereumIcon.vue";
import { useWallet } from "@/composables/useWallet";

export default defineComponent({
  components: {
    // AppModal,
    // AppButton,
    // ChevronDownIcon,
    // UserCircleIcon,
    // ClipboardCopyIcon,
    // EthereumIcon,
    // ExternalLinkIcon,
    HomeHero,
    HomeAbout,
    HomeItemGallery,
    HomeRoadmap,
    HomeRarity,
    HomeInfo,
    HomeFaq,
    HomeCta,
    WrongNetwork,
  },
  setup() {
    const modelValue = ref(false);
    let { contract } = useContract();
    const { network } = useWallet();
    const ethereumInterface = new EthereumInterface();

    const { result, error, refetch } = useQuery(
      getContract,
      () => ({
        id: CONTRACT_ADDRESS.toLocaleLowerCase(),
      }),
      {
        fetchPolicy: "cache-and-network",
      }
    );

    const res = useResult(result, null, (data) => data.contract);

    const wrongNetwork = computed(() => {
      if (network.value) {
        return window.ethereum && network.value.name !== "ropsten";
      }
      return false;
    });

    watchEffect(() => {
      if (res.value) {
        contract.value = unref(res) as Contract;
      }
    });

    ethereumInterface.subscribeToNewBlock(refetch);
    ethereumInterface.subscribeToTransfer(refetch);

    return { error, modelValue, wrongNetwork };
  },
});
</script>
