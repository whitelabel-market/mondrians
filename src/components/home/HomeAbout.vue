<template>
  <section id="About" class="bg-reddish text-white mondrian-border-b">
    <div
      class="grid md:grid-cols-2 gap-4 md:gap-20 items-center container max-w-4xl mx-auto px-8"
    >
      <div class="space-y-4">
        <h2 class="section-title" v-animate>What are the Mondrians?</h2>
        <p v-animate>
          Mondrians is a drop of custom digital paintings, created by
          <span class="font-serif text-yellowish">PIET MONDRIAN</span>, aiming
          to express culture, uniqueness and creativity. Through size, shape and
          color Mondrian’s embraces what it means to be on the common ground but
          having a sense of uniqueness.
        </p>
        <div v-animate>
          <AppButton :fullWidth="false">Get Yours Now</AppButton>
        </div>
      </div>
      <img
        v-animate
        src="@/assets/images/image-5.png"
        alt="What are the Mondrian's?"
        class="mdx:mx-auto order-first md:order-none"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import AppButton from "@/components/app/AppButton.vue";
</script>
