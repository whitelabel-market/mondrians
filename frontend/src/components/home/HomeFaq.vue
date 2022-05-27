<template>
  <section
    id="Faq"
    class="space-y-8 bg-yellowish mondrian-border-b text-neutral-900"
  >
    <div class="container max-w-4xl px-8 mx-auto space-y-8">
      <h2 class="text-center section-title" v-animate>FAQ</h2>
      <ul class="space-y-4">
        <li v-animate v-for="(question, index) in questions" :key="index">
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
    <div class="flex flex-col justify-center space-y-8">
      <h2
        class="flex flex-col items-center text-xl font-black uppercase md:text-3xl text-neutral-900"
        v-animate
      >
        Get your
        <LogoIcon class="!text-xl md:!text-3xl text-neutral-900" /> NFT now
      </h2>
      <div v-animate>
        <AppButton color="reddish" class="mx-auto" :fullWidth="false"
          >View on Opensea
        </AppButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import AppDisclosure from "@/components/app/AppDisclosure.vue";
import AppButton from "@/components/app/AppButton.vue";
import LogoIcon from "@/components/icons/LogoIcon.vue";

const questions = [
  "When is the mint date?",
  "What’s an NFT?",
  "Why Magic Mondrians?",
  "What exactly will I get?",
];
</script>
