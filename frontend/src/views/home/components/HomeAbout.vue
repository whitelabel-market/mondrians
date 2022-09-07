<template>
  <section
    id="About"
    class="text-white transition-colors duration-200 bg-crimson-500 dark:bg-crimson-800 mondrian-border-b dark:duration-200"
  >
    <div
      class="container grid items-center max-w-4xl gap-4 px-8 mx-auto md:grid-cols-2 md:gap-20"
    >
      <div class="space-y-8">
        <h2 class="section-title" v-animate>What are the Mondrians?</h2>
        <p v-animate>
          Mondrians is a drop of custom digital paintings, created by Piet
          Mondrian, aiming to express culture, uniqueness and creativity.
          Through size, shape and color Mondrian's embraces what it means to be
          on the common ground but having a sense of uniqueness.
        </p>
        <div v-animate>
          <MamoButton to="/mint">Get Yours Now</MamoButton>
        </div>
      </div>
      <img
        v-animate
        src="@/assets/images/image-5.png"
        alt="What are the Mondrian's?"
        class="order-first mdx:mx-auto md:order-none"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { MamoButton } from "@/components/Button";
</script>
