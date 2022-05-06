<template>
  <section class="bg-blueish relative overflow-hidden">
    <div class="container mx-auto max-w-4xl">
      <img
        src="@/assets/images/image-6.png"
        alt="Get your Mondrian's NFT now"
        class="absolute top-0 left-0 h-full w-full object-[90%_0%] object-contain"
      />

      <div
        class="relative z-10 px-4 py-8 md:px-8 w-4/5 max-w-2xl transform translate-y-20 bg-blueish"
      >
        <div class="space-y-4">
          <h2 class="gs_reveal text-3xl lg:text-4xl font-semibold">
            Get your Mondrian's NFT now
          </h2>
          <AppButton class="gs_reveal" :fullWidth="false"
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
