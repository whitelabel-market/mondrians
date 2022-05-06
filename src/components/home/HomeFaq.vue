<template>
  <section id="Faq" class="bg-yellowish mondrian-border-bottom">
    <div class="container mx-auto max-w-4xl px-8 space-y-8">
      <h2
        class="text-5xl md:text-6xl font-serif text-center font-bold gs_reveal"
      >
        Frequently Asked Questions
      </h2>

      <ul class="space-y-4">
        <li
          class="gs_reveal"
          v-for="(question, index) in questions"
          :key="index"
        >
          <Disclosure
            as="div"
            v-slot="{ open }"
            class="w-full border-8 border-black bg-yellow-100"
          >
            <DisclosureButton
              class="w-full p-4 flex items-center justify-between cursor-pointer"
            >
              <span class="font-serif text-lg">{{ question }}</span>
              <ChevronDownIcon
                class="w-6 h-6 transition duration-150 ease-in-out"
                :class="open ? 'transform rotate-180' : ''"
              />
            </DisclosureButton>
            <DisclosurePanel class="pt-0 p-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              ciusmod tempor incididunt ut labore et dolore magna aliqua.
            </DisclosurePanel>
          </Disclosure>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import useTransition from "@/composables/useTransition";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/solid";

useTransition();
const questions = [
  "When is the mint date?",
  "What’s an NFT?",
  "Why Mondiran’s?",
  "What exactly will I get?",
];
</script>
