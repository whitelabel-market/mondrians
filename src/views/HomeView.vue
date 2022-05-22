<template>
  <HomeHero :loaded="isFinished" />
  <HomeAbout />
  <HomeItemGallery />
  <HomeRoadmap />
  <HomeRarity />
  <HomeInfo />
  <HomeFaq />
  <HomeCta />
</template>

<script setup lang="ts">
import HomeHero from "@/components/home/HomeHero.vue";
import HomeAbout from "@/components/home/HomeAbout.vue";
import HomeItemGallery from "@/components/home/HomeItemGallery.vue";
import HomeRoadmap from "@/components/home/HomeRoadmap.vue";
import HomeRarity from "@/components/home/HomeRarity.vue";
import HomeInfo from "@/components/home/HomeInfo.vue";
import HomeFaq from "@/components/home/HomeFaq.vue";
import HomeCta from "@/components/home/HomeCta.vue";
import { watch } from "vue";
import { useFetch } from "@vueuse/core";
import { CONTRACT_ADDRESS, MAMO_SUBGRAPH } from "@/utils/constants";
import { getContract } from "@/services/graphql/types";
import { useWindowActive } from "@/composables/useWindowActive";
import useContract from "@/composables/useContract";
import EthereumInterface from "@/services/EthereumInterface";

const emits = defineEmits(["loaded"]);

let { setContract } = useContract();
const active = useWindowActive();

const ethereumInterface = new EthereumInterface();

const { onFetchResponse, data, execute, isFinished } = useFetch(MAMO_SUBGRAPH, {
  timeout: 10000,
})
  .post(
    JSON.stringify({
      query: getContract,
      variables: {
        id: CONTRACT_ADDRESS.toLocaleLowerCase(),
      },
    })
  )
  .json();

onFetchResponse(() => {
  if (data?.value?.data?.contract) setContract(data.value.data.contract);
});

watch(isFinished, () => {
  if (isFinished) emits("loaded");
});

watch(
  active,
  (isActive) => {
    if (isActive) {
      ethereumInterface.subscribeToNewBlock(execute);
      ethereumInterface.subscribeToTransfer(execute);
    } else {
      ethereumInterface.unsubscribe();
    }
  },
  { immediate: true }
);
</script>
