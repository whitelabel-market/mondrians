<template>
  <div
    class="container w-full max-w-4xl px-8 py-24 mx-auto space-y-24 duration-200 text-neutral-800 dark:text-neutral-200"
  >
    <div
      v-if="!presaleOpen"
      class="flex flex-col justify-center mx-auto space-y-8"
      v-animate.stagger
    >
      <h2
        class="flex flex-col items-center text-3xl font-black text-center uppercase md:text-4xl"
      >
        Get your
        <MamoLogoIcon
          class="!text-3xl md:!text-4xl transition-colors duration-200 text-neutral-800 dark:text-neutral-200"
        />
        NFT now
      </h2>
      <div class="mx-auto">
        <MamoButton color="crimson" to="/mint">Create your own</MamoButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MamoButton } from "@/components/Button";
import { MamoLogoIcon } from "@/components/Icon";
import { useFlag } from "@/composables/useFlags";
import { SalePhase } from "@/utils/constants";

const presaleOpen = useFlag(SalePhase.PreSale);
</script>
