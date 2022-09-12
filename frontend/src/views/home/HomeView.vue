<template>
  <HomeHero />
  <HomeAbout />
  <HomeItemGallery />
  <HomeRoadmap />
  <HomeRarity />
  <HomeInfo />
  <HomeFaq />
</template>

<script setup lang="ts">
import { useHead } from "@vueuse/head";
import HomeHero from "./components/HomeHero.vue";
import HomeAbout from "./components/HomeAbout.vue";
import HomeItemGallery from "./components/HomeItemGallery.vue";
import HomeRoadmap from "./components/HomeRoadmap.vue";
import HomeRarity from "./components/HomeRarity.vue";
import HomeInfo from "./components/HomeInfo.vue";
import HomeFaq from "./components/HomeFaq.vue";

useHead({
  title: "A drop of custom digital paintings by Piet Mondrian",
});
</script>
