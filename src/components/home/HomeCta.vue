<template>
  <section class="bg-blueish py-20 relative mondrian-border-bottom">
    <div class="container px-8 mx-auto max-w-4xl">
      <img
        src="@/assets/images/image-6.png"
        alt="Get your Mondrian's NFT now"
        class="absolute -z-0 top-0 left-0 h-full w-full object-[90%_0%] object-contain"
      />

      <div
        class="relative p-8 border-8 border-black w-full max-w-lg h-64 mx-auto translate-y-20 flex flex-col items-center justify-end text-center z-50 bg-white rounded-t-full"
      >
        <div class="w-2/3 space-y-4">
          <h2 class="gs_reveal text-3xl font-semibold">
            Get your Mondrian's NFT now
          </h2>

          <AppButton class="gs_reveal mx-auto" :fullWidth="false"
            >View on Opensea
          </AppButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import useTransition from "@/composables/useTransition";
import AppButton from "@/components/app/AppButton.vue";
useTransition();
</script>
