<template>
  <div class="relative">
    <div class="relative flex flex-col w-full mx-auto space-y-4 text-center">
      <p class="z-10 text-lg w-full max-w-lg mx-auto">
        <slot name="description"></slot>
      </p>

      <slot />

      <div
        v-if="!isActive"
        class="absolute z-0 -inset-2 bg-white/80 dark:bg-neutral-900/80 transition-colors duration-100"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  isActive: {
    type: Boolean,
    default: true,
  },
});
</script>
