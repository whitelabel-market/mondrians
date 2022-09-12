<template>
  <div
    class="flex flex-col items-start gap-4 lgs:max-w-[454px]"
    v-animate.stagger
  >
    <div
      class="mx-auto text-5xl font-black text-center text-transparent md:text-6xl"
      v-if="isSoldOut"
    >
      <span
        class="text-transparent outline outline-1 bg-clip-text bg-gradient-to-r from-dodgerblue via-candlelight to-crimson"
      >
        Sold Out
      </span>
    </div>
    <div v-else class="flex flex-col items-start w-full gap-4">
      <div
        class="px-4 mx-auto text-5xl font-black text-center text-transparent md:text-6xl"
      >
        <span
          class="text-transparent outline outline-1 bg-clip-text bg-gradient-to-r from-dodgerblue via-candlelight to-crimson"
          >Magic Mondrian</span
        >
      </div>
      <p
        class="w-full px-6 text-base font-bold text-center transition-colors duration-200 md:text-xl text-neutral-900 dark:text-neutral-200"
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

    <div class="mx-auto">
      <MamoButton> View on Opensea </MamoButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MamoButton } from "@/components/Button";
import { useContract } from "@/composables/useContract";

const { isSoldOut, maxSupply } = useContract();
</script>
