<template>
  <HomeHero :loaded="isFinished" />
  <HomeAbout />
  <HomeItemGallery />
  <HomeRoadmap />
  <HomeRarity />
  <HomeInfo />
  <HomeFaq />
  <!-- <HomeCta /> -->
</template>

<script setup lang="ts">
import { useFetch } from "@vueuse/core";
import CONFIG from "../../../../config";
import { getContract } from "@/services/graphql/types";
import { useBlock } from "@whitelabel-solutions/wallet-connector-vue";
import { useHead } from "@vueuse/head";
import useContract from "@/composables/useContract";
import HomeHero from "./components/HomeHero.vue";
import HomeAbout from "./components/HomeAbout.vue";
import HomeItemGallery from "./components/HomeItemGallery.vue";
import HomeRoadmap from "./components/HomeRoadmap.vue";
import HomeRarity from "./components/HomeRarity.vue";
import HomeInfo from "./components/HomeInfo.vue";
import HomeFaq from "./components/HomeFaq.vue";
import { useAppStore } from "@/store/modules/app";

useHead({
  title: "A drop of custom digital paintings by Piet Mondrian",
});

const { setPageLoading } = useAppStore();
const { setContract } = useContract();

const { onNewBlock } = useBlock();
const { onFetchResponse, data, execute, isFinished } = useFetch(
  CONFIG.subgraph.mamo,
  {
    timeout: 10000,
  }
)
  .post(
    JSON.stringify({
      query: getContract,
      variables: {
        id: CONFIG.contract.toLocaleLowerCase(),
      },
    })
  )
  .json();

onFetchResponse(() => {
  if (data?.value?.data?.contract) setContract(data.value.data.contract);
  setPageLoading(false);
});

onNewBlock(() => {
  execute();
});
</script>
