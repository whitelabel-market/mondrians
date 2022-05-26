<template>
  <Disclosure
    as="div"
    v-slot="{ open }"
    class="w-full bg-yellow-100 border-4 border-neutral-800 rounded-xl"
  >
    <DisclosureButton
      class="flex items-center justify-between w-full p-4 cursor-pointer after:block after:absolute after:bottom-0 after:right-0 after:-z-10 after:!w-full after:!h-full after:translate-x-1 after:translate-y-1 after:bg-neutral-800 after:rounded-xl"
    >
      <span class="text-lg font-bold"><slot name="question" /></span>
      <ChevronDownIcon
        class="w-6 h-6 transition duration-150 ease-in-out"
        :class="open ? 'transform rotate-180' : ''"
      />
    </DisclosureButton>

    <transition
      enter-from-class="max-h-0"
      enter-to-class="max-h-32"
      leave-from-class="max-h-32"
      leave-to-class="max-h-0"
    >
      <DisclosurePanel
        class="p-4 pt-0 transition-[max-height] duration-75 ease-out overflow-hidden"
      >
        <slot name="answer" />
      </DisclosurePanel>
    </transition>
  </Disclosure>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronDownIcon } from "@heroicons/vue/solid";
</script>
