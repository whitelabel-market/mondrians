<template>
  <section id="Creator" class="text-white bg-reddish mondrian-border-b">
    <div
      class="container grid items-center max-w-4xl gap-12 px-8 mx-auto md:grid-cols-2 md:gap-20"
    >
      <div class="space-y-8">
        <div class="-translate-x-0.5 section-title" v-animate>Creator</div>

        <div class="space-y-2">
          <p v-animate>
            I’m Piet Mondrian, a full time painter and art theoretician who is
            regarded as one of the greatest artists of the 20th century. I have
            more than 100 years of experience in experimenting with art.
          </p>
          <p v-animate>
            When I’m not creating, you can either catch me experimenting with
            colors, eating cheese or on my
            <a class="font-medium text-yellowish" href="">private Discord</a>.
          </p>
        </div>
        <div v-animate>
          <AppButton> Follow on Twitter </AppButton>
        </div>
      </div>
      <img
        src="@/assets/images/image-3.png"
        alt="Creator"
        class="md:order-first"
        v-animate
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import AppButton from "@/components/app/AppButton.vue";
</script>
