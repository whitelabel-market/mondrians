<template>
  <div
    class="flex flex-col items-start gap-4 lgs:ml-8 mt-6 lgs:mt-0 lgs:max-w-[454px]"
  >
    <div
      class="px-4 mx-auto text-5xl font-black text-center text-transparent md:text-6xl"
    >
      <span
        class="text-transparent bg-clip-text bg-gradient-to-r from-blueish via-yellowish to-reddish"
        >Magic Mondrian</span
      >
    </div>
    <p class="w-full px-4 text-base font-bold text-center md:text-xl">
      A
      <span
        id="nft-counter"
        class="text-transparent truncate bg-clip-text bg-gradient-to-r from-reddish via-yellowish to-blueish"
        >100</span
      >
      piece custom collection is joining the NFT Space.
    </p>
    <p
      v-if="revealEnabled"
      class="md:text-xl text-2xl font-bold mdx:px-[1.813rem] text-center text-red-500"
    >
      Sold out
    </p>
    <AppButton class="mx-auto"> View on Opensea </AppButton>
  </div>
</template>

<script setup lang="ts">
import AppButton from "@/components/app/AppButton.vue";
import { gsap } from "gsap";
import { watch } from "vue";

const props = defineProps({
  revealEnabled: {
    type: Boolean,
    required: true,
  },
  loaded: {
    type: Boolean,
    required: true,
  },
});

watch(
  () => props.loaded,
  () => {
    gsap.to("#nft-counter", {
      innerText: 1000,
      duration: 3,
      ease: "power2.inOut",
      snap: {
        innerText: 10,
      },
    });
  }
);
</script>
