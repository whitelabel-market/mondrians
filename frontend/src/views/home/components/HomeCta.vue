<template>
  <section class="relative py-20 bg-dodgerblue mondrian-border-b">
    <div class="container max-w-4xl mx-auto md:px-8">
      <img
        src="@/assets/images/image-6.png"
        alt="Get your Mondrian's NFT now"
        class="absolute -z-0 top-0 left-0 h-full w-full object-[90%_0%] object-contain"
      />
      <div
        class="relative z-50 flex flex-col items-center justify-end w-full p-8 mx-auto text-center translate-y-20 bg-white rounded-t-full md:max-w-lg mondrian-border-b h-72"
      >
        <div class="w-2/3 space-y-8" v-animate.stagger>
          <h2 class="text-xl font-black uppercase md:text-3xl text-neutral-900">
            Get your
            <MamoLogoIcon class="!text-xl md:!text-3xl text-neutral-900" /> NFT
            now
          </h2>
          <div>
            <MamoButton class="mx-auto" :fullWidth="false"
              >View on Opensea
            </MamoButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { MamoButton } from "@/components/Button";
import { MamoLogoIcon } from "@/components/Icon";
</script>
