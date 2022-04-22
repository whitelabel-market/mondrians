<template>
  <section id="Faq" class="md:mt-28 mt-[4.25rem] md:mb-36 mb-20 mdx:px-4">
    <h1
      class="gs_reveal font-bold md:text-4xl text-[1.875rem] md:leading-6 leading-[2.063rem] text-center"
    >
      Frequently Asked Questions
    </h1>
    <div class="md:mt-12 mt-[4.25rem]">
      <Disclosure
        as="div"
        v-for="(question, index) in questions"
        :key="index"
        class="max-w-2xl mx-auto mt-2 gs_reveal"
        v-slot="{ open }"
      >
        <DisclosureButton
          class="text-lg font-bold w-full flex items-center justify-between md:pb-5 md:pt-6 px-6 bg-dropdown cursor-pointer md:text-base text-[0.938rem] mdx:leading-[1.375rem] rounded-[0.313rem] py-[1.125rem]"
        >
          <span>{{ question }}</span>
          <ChevronDownIcon
            class="w-6 h-6 transition duration-150 ease-in-out"
            :class="open ? 'transform rotate-180' : ''"
          />
        </DisclosureButton>
        <DisclosurePanel
          class="text-sm w-full flex items-center justify-between px-6 cursor-pointer md:text-base text-[0.938rem] mdx:leading-[1.375rem] rounded-[0.313rem] py-[1.125rem]"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          ciusmod tempor incididunt ut labore et dolore magna aliqua.
        </DisclosurePanel>
      </Disclosure>
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
