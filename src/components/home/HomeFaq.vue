<template>
  <section
    id="Faq"
    class="space-y-8 bg-yellowish mondrian-border-b text-neutral-900"
  >
    <div class="container max-w-4xl px-8 mx-auto space-y-8">
      <h2 class="text-center section-title" v-animate>FAQ</h2>
      <ul class="space-y-4">
        <li v-animate v-for="(question, index) in questions" :key="index">
          <Disclosure
            as="div"
            v-slot="{ open }"
            class="w-full bg-yellow-100 border-4 border-neutral-800 rounded-xl"
          >
            <DisclosureButton
              class="flex items-center justify-between w-full p-4 cursor-pointer after:block after:absolute after:bottom-0 after:right-0 after:-z-10 after:!w-full after:!h-full after:translate-x-1 after:translate-y-1 after:bg-neutral-800 after:rounded-xl"
            >
              <span class="text-lg font-bold">{{ question }}</span>
              <ChevronDownIcon
                class="w-6 h-6 transition duration-150 ease-in-out"
                :class="open ? 'transform rotate-180' : ''"
              />
            </DisclosureButton>
            <DisclosurePanel class="p-4 pt-0">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              ciusmod tempor incididunt ut labore et dolore magna aliqua.
            </DisclosurePanel>
          </Disclosure>
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
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/solid";
import AppButton from "@/components/app/AppButton.vue";
import LogoIcon from "@/components/icons/LogoIcon.vue";

const questions = [
  "When is the mint date?",
  "What’s an NFT?",
  "Why Mondiran’s?",
  "What exactly will I get?",
];
</script>
