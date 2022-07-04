<template>
  <section id="About" class="text-white bg-reddish/90 mondrian-border-b">
    <div
      class="container grid items-center max-w-4xl gap-4 px-8 mx-auto md:grid-cols-2 md:gap-20"
      v-animate
    >
      <div class="space-y-8">
        <h2 class="section-title">What are the Mondrians?</h2>
        <p>
          Mondrians is a drop of custom digital paintings, created by
          <span class="font-medium text-yellowish">PIET MONDRIAN</span>, aiming
          to express culture, uniqueness and creativity. Through size, shape and
          color Mondrian's embraces what it means to be on the common ground but
          having a sense of uniqueness.
        </p>
        <div>
          <AppButton>Get Yours Now</AppButton>
        </div>
      </div>
      <img
        src="@/assets/images/image-5.png"
        alt="What are the Mondrian's?"
        class="order-first mdx:mx-auto md:order-none"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import AppButton from "@/components/app/AppButton.vue";
</script>
