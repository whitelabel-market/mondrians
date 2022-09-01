<template>
  <div class="grid md:grid-cols-2 items-center">
    <ul class="text-xl flex flex-col text-left">
      <li
        v-for="(title, key) in tasks"
        :key="key"
        class="opacity-0 flex items-center space-x-2"
        :class="{ 'opacity-100': finishedTasks[key] }"
      >
        <CheckIcon class="block text-green-500 w-8" v-if="finishedTasks[key]" />
        <span class="block">{{ title }} </span>
      </li>
    </ul>
    <img
      v-if="finishedTasks.mint"
      class="md:order-first"
      src="@/assets/images/image-1.png"
      alt="Mint Confirmation"
    />
  </div>
</template>

<script setup lang="ts">
import { CheckIcon } from "@heroicons/vue/outline";

defineProps({
  finishedTasks: {
    type: Object,
    default: () => ({}),
  },
});

const tasks = {
  mint: "Mint Magic Mondrian NFT",
  sendTicket: "Receive Event Invitation",
  print: "Print NFT",
};
</script>
