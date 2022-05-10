<template>
  <section id="Creator" class="bg-reddish text-white mondrian-border-b">
    <div
      class="container max-w-4xl mx-auto px-8 grid md:grid-cols-2 gap-4 md:gap-20 items-center"
    >
      <div class="space-y-8">
        <h2 class="section-title" v-animate>Creator</h2>

        <div class="space-y-2">
          <p v-animate>
            I’m Piet Mondrian, a full time painter and art theoretician who is
            regarded as one of the greatest artists of the 20th century. I have
            more than 100 years of experience in experimenting with art.
          </p>
          <p v-animate>
            When I’m not creating, you can either catch me experimenting with
            colors, eating cheese or on my
            <a class="font-serif text-yellowish" href="">private Discord</a>.
          </p>
        </div>
        <AppButton v-animate> Follow on Twitter </AppButton>
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
