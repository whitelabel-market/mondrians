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
import HomeHero from "@/components/home/HomeHero.vue";
import HomeAbout from "@/components/home/HomeAbout.vue";
import HomeItemGallery from "@/components/home/HomeItemGallery.vue";
import HomeRoadmap from "@/components/home/HomeRoadmap.vue";
import HomeRarity from "@/components/home/HomeRarity.vue";
import HomeInfo from "@/components/home/HomeInfo.vue";
import HomeFaq from "@/components/home/HomeFaq.vue";
import { onMounted, watch } from "vue";
import { useFetch } from "@vueuse/core";
import CONFIG from "../../../config.js";
import { getContract } from "@/services/graphql/types";
import { useBlock } from "@whitelabel-solutions/wallet-connector-vue";
import useContract from "@/composables/useContract";
import { useHead } from "@vueuse/head";

useHead({
  title: "A drop of custom digital paintings by Piet Mondrian",
});

const emits = defineEmits(["loaded"]);

onMounted(() => emits("loaded", false));

let { setContract } = useContract();

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
});

watch(isFinished, () => {
  if (isFinished) emits("loaded", true);
});

onNewBlock(() => {
  execute();
});
</script>
