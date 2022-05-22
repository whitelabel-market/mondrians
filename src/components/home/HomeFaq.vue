<template>
  <section id="Faq" class="bg-yellowish mondrian-border-b">
    <div class="container max-w-4xl px-8 mx-auto space-y-8">
      <h2 class="text-center section-title" v-animate>FAQ</h2>

      <ul class="space-y-4">
        <li v-animate v-for="(question, index) in questions" :key="index">
          <Disclosure
            as="div"
            v-slot="{ open }"
            class="w-full bg-yellow-100 border-4 border-black rounded-xl"
          >
            <DisclosureButton
              class="flex items-center justify-between w-full p-4 cursor-pointer"
            >
              <span class="text-lg font-bold">{{ question }}</span>
              <ChevronDownIcon
                class="w-6 h-6 transition duration-150 ease-in-out"
                :class="open ? 'transform rotate-180' : ''"
              />
              <span
                class="block absolute bottom-0 right-0 -z-10 !w-full !h-full translate-x-1 translate-y-1 bg-black rounded-xl"
              ></span>
            </DisclosureButton>
            <DisclosurePanel class="p-4 pt-0">
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
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/solid";

const questions = [
  "When is the mint date?",
  "What’s an NFT?",
  "Why Mondiran’s?",
  "What exactly will I get?",
];
</script>
