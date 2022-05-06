<template>
  <section id="Creator" class="bg-reddish text-white mondrian-border-b">
    <div
      class="container max-w-4xl mx-auto px-8 grid md:grid-cols-2 gap-4 md:gap-20 items-center"
    >
      <div class="space-y-4">
        <h2 class="text-5xl md:text-6xl font-serif font-bold gs_reveal">
          Creator
        </h2>

        <div class="space-y-2">
          <p class="gs_reveal">
            I’m Piet Mondrian, a full time painter and art theoretician who is
            regarded as one of the greatest artists of the 20th century. I have
            more than 100 years of experience in experimenting with art.
          </p>
          <p class="gs_reveal">
            When I’m not creating, you can either catch me experimenting with
            colors, eating cheese or on my
            <a class="font-serif text-yellowish" href="">private Discord</a>.
          </p>
        </div>
        <AppButton class="gs_reveal" :fullWidth="false">
          Follow on Twitter
        </AppButton>
      </div>
      <img
        src="@/assets/images/image-3.png"
        alt="Creator"
        class="gs_reveal gs_reveal_fromLeft md:order-first"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import useTransition from "@/composables/useTransition";
import AppButton from "@/components/app/AppButton.vue";
useTransition();
</script>
