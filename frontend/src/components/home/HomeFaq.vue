<template>
  <section
    id="Faq"
    class="space-y-8 bg-candlelight dark:bg-candlelight-600 mondrian-border-b text-neutral-900"
  >
    <div class="container max-w-4xl px-8 mx-auto space-y-8">
      <h2 class="text-center section-title" v-animate>FAQ</h2>
      <ul class="space-y-4" v-animate.stagger>
        <li v-for="(question, index) in questions" :key="index" class="block">
          <AppDisclosure>
            <template #question> {{ question }}</template>
            <template #answer>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              ciusmod tempor incididunt ut labore et dolore magna aliqua.
            </template>
          </AppDisclosure>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import AppDisclosure from "@/components/app/AppDisclosure.vue";

const questions = [
  "When is the mint date?",
  "What’s an NFT?",
  "Why Magic Mondrians?",
  "What exactly will I get?",
];
</script>
