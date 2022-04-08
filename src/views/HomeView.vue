<template>
  <div>
    <HomeHero />
    <HomeAbout />
    <HomeItemGallery />
    <HomeRoadmap />
    <HomeRarity />
    <HomeInfo />
    <HomeFaq />
    <HomeCta />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HomeHero from "@/components/home/HomeHero.vue";
import HomeAbout from "@/components/home/HomeAbout.vue";
import HomeItemGallery from "@/components/home/HomeItemGallery.vue";
import HomeRoadmap from "@/components/home/HomeRoadmap.vue";
import HomeRarity from "@/components/home/HomeRarity.vue";
import HomeInfo from "@/components/home/HomeInfo.vue";
import HomeFaq from "@/components/home/HomeFaq.vue";
import HomeCta from "@/components/home/HomeCta.vue";

export default defineComponent({
  components: {
    HomeHero,
    HomeAbout,
    HomeItemGallery,
    HomeRoadmap,
    HomeRarity,
    HomeInfo,
    HomeFaq,
    HomeCta,
  },
});
</script>
