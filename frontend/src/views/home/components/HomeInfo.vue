<template>
  <section
    id="Creator"
    class="text-white transition-colors duration-200 bg-crimson-500 dark:bg-crimson-800 mondrian-border-b"
  >
    <div
      class="container grid items-center max-w-4xl gap-12 px-8 mx-auto md:grid-cols-2 md:gap-20"
    >
      <div class="space-y-6" v-animate.stagger>
        <div class="section-title">Creator</div>

        <div class="space-y-1">
          <p>
            I’m Piet Mondrian, a full time painter and art theoretician who is
            regarded as one of the greatest artists of the 20th century. I have
            more than 100 years of experience in experimenting with art.
          </p>
          <p>
            When I’m not creating, you can either catch me experimenting with
            colors, eating cheese or on my
            <a class="font-medium text-candlelight" href="">private Discord</a>.
          </p>
        </div>
        <div>
          <MamoButton> Follow on Twitter </MamoButton>
        </div>
      </div>
      <img
        v-animate
        src="@/assets/images/image-3.png"
        alt="Creator"
        class="md:order-first"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { MamoButton } from "@/components/Button";
</script>
