<template>
  <section class="relative py-20 bg-blueish mondrian-border-b">
    <div class="container max-w-4xl px-8 mx-auto">
      <img
        src="@/assets/images/image-6.png"
        alt="Get your Mondrian's NFT now"
        class="absolute -z-0 top-0 left-0 h-full w-full object-[90%_0%] object-contain"
      />

      <div
        class="relative z-50 flex flex-col items-center justify-end w-full max-w-lg p-8 mx-auto text-center translate-y-20 bg-white rounded-t-full h-72"
      >
        <div class="w-2/3 space-y-8">
          <h2 class="text-xl font-black uppercase md:text-3xl" v-animate>
            Get your <LogoIcon class="!text-xl md:!text-3xl" /> NFT now
          </h2>

          <AppButton class="mx-auto" :fullWidth="false" v-animate
            >View on Opensea
          </AppButton>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import AppButton from "@/components/app/AppButton.vue";
import LogoIcon from "@/components/icons/LogoIcon.vue";
</script>
