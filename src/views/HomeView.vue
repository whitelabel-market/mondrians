<template>
  <HomeHero />
  <HomeAbout />
  <HomeItemGallery />
  <HomeRoadmap />
  <HomeRarity />
  <HomeInfo />
  <HomeFaq />
  <HomeCta />
</template>

<script setup lang="ts">
import { watch } from "vue";
import HomeHero from "@/components/home/HomeHero.vue";
import HomeAbout from "@/components/home/HomeAbout.vue";
import HomeItemGallery from "@/components/home/HomeItemGallery.vue";
import HomeRoadmap from "@/components/home/HomeRoadmap.vue";
import HomeRarity from "@/components/home/HomeRarity.vue";
import HomeInfo from "@/components/home/HomeInfo.vue";
import HomeFaq from "@/components/home/HomeFaq.vue";
import HomeCta from "@/components/home/HomeCta.vue";
import { useFetch } from "@vueuse/core";
import { CONTRACT_ADDRESS, MAMO_SUBGRAPH } from "@/utils/constants";
import { getContract } from "@/services/graphql/types";
import type { Contract } from "@/composables/useContract";
import useContract from "@/composables/useContract";
import EthereumInterface from "@/services/EthereumInterface";

let { contract } = useContract();
const ethereumInterface = new EthereumInterface();

const { data, execute } = useFetch(MAMO_SUBGRAPH)
  .post(
    JSON.stringify({
      query: getContract,
      variables: {
        id: CONTRACT_ADDRESS.toLocaleLowerCase(),
      },
    })
  )
  .json();

watch(data, () => {
  if (data?.value?.data?.contract)
    contract.value = data?.value?.data?.contract as Contract;
});

ethereumInterface.subscribeToNewBlock(execute);
ethereumInterface.subscribeToTransfer(execute);
</script>
