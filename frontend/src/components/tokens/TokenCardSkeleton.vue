<template>
  <div
    class="flex flex-col justify-between h-full gap-4 p-4 border-2 border-neutral-200 dark:border-neutral-700 rounded"
  >
    <div
      class="flex justify-end -space-x-6 sm:justify-start lg:justify-end xl:justify-start"
      v-if="!dense"
    >
      <div
        class="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-700 animate-pulse"
      ></div>
    </div>
    <div
      class="flex items-center justify-center w-full aspect-square bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse"
      style="animation-delay: 100ms; animation-fill-mode: backwards"
    ></div>
    <div v-if="!dense" class="flex items-center justify-between">
      <div
        class="w-16 h-6 rounded-full bg-neutral-200 dark:bg-neutral-700 animate-pulse"
        style="animation-delay: 200ms; animation-fill-mode: backwards"
      ></div>
    </div>
    <div class="flex items-center justify-between">
      <div class="flex flex-col space-y-2 w-full">
        <div
          class="w-full h-3 rounded-full bg-neutral-200 dark:bg-neutral-700 animate-pulse"
          style="animation-delay: 300ms; animation-fill-mode: backwards"
        ></div>
        <div
          class="w-2/3 h-3 rounded-full bg-neutral-200 dark:bg-neutral-700 animate-pulse"
          style="animation-delay: 300ms; animation-fill-mode: backwards"
        ></div>
      </div>
      <div class="w-1/3 aspect-square"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps({
  dense: {
    type: Boolean,
    default: false,
  },
});
</script>
