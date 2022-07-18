<template>
  <div class="flex flex-col items-start gap-4 lgs:max-w-[454px]">
    <div v-if="!revealEnabled" class="flex flex-col items-start gap-4 w-full">
      <div
        class="px-4 mx-auto text-5xl font-black text-center text-transparent animate md:text-6xl"
      >
        <span
          class="text-transparent outline outline-1 bg-clip-text bg-gradient-to-r from-dodgerblue via-candlelight to-crimson"
          >Magic Mondrian</span
        >
      </div>
      <p
        class="w-full px-6 text-base font-bold text-center animate md:text-xl text-neutral-900 dark:text-neutral-200 transition-colors duration-100"
      >
        A
        <span
          id="nft-counter"
          class="text-transparent truncate bg-clip-text bg-gradient-to-r from-crimson via-candlelight to-dodgerblue"
          >{{ maxSupply }}</span
        >
        piece custom collection is joining the NFT Space.
      </p>
    </div>
    <div
      class="mx-auto text-5xl font-black text-center text-transparent md:text-6xl"
      v-if="revealEnabled"
    >
      <span
        class="text-transparent outline outline-1 bg-clip-text bg-gradient-to-r from-dodgerblue via-candlelight to-crimson"
      >
        Sold Out
      </span>
    </div>
    <div class="mx-auto animate">
      <AppButton> View on Opensea </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppButton from "@/components/app/AppButton.vue";
import { gsap } from "gsap";
import { onMounted, ref, watch } from "vue";

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

const maxSupply = ref(100);

const from = { y: 20, autoAlpha: 0 };
const duration = 0.4;

onMounted(() => {
  if (!props.loaded) {
    gsap.set(".animate", { opacity: 0 });
    watch(
      () => props.loaded,
      () => {
        gsap.set(".animate", { opacity: 1 });
        gsap.to("#nft-counter", {
          innerText: 1000,
          duration: 3,
          ease: "power2.inOut",
          snap: {
            innerText: 10,
          },
        });
        gsap.from(".animate", {
          ...from,
          stagger: {
            amount: duration,
          },
          duration,
          ease: "power2.inOut",
        });
      }
    );
  } else {
    maxSupply.value = 1000;
  }
});
</script>
