<template>
  <Disclosure
    as="div"
    v-slot="{ open }"
    class="w-full bg-candlelight-200 dark:bg-candlelight-500 border-4 border-neutral-800 rounded relative after:block after:absolute after:bottom-0 after:right-0 after:-z-10 after:!w-full after:!h-full after:translate-x-1 after:translate-y-1 after:bg-neutral-800 after:rounded"
  >
    <DisclosureButton
      class="flex items-center justify-between w-full p-4 cursor-pointer"
    >
      <span class="text-lg font-bold"><slot name="question" /></span>
      <ChevronDownIcon
        class="w-6 h-6 transition duration-150 ease-in-out"
        :class="open ? 'transform rotate-180' : ''"
      />
    </DisclosureButton>

    <Transition @enter="onEnter" @leave="onLeave" :css="false">
      <div v-show="open" class="h-0 overflow-hidden">
        <div class="p-4 pt-0"><slot name="answer" /></div>
      </div>
    </Transition>
  </Disclosure>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/solid";
import { gsap } from "gsap";

const toggle = (el: HTMLElement, height: string) =>
  gsap.to(el, { height, duration: 0.1, ease: "power3.out" });

const onEnter = async (el: HTMLElement, done: any) =>
  toggle(el, "auto").then(done);

const onLeave = async (el: HTMLElement, done: any) =>
  toggle(el, "0").then(done);
</script>
