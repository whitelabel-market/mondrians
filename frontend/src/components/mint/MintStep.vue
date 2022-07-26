<template>
  <div class="relative">
    <div class="relative flex flex-col w-full mx-auto space-y-4 text-center">
      <p class="z-20 w-full mx-auto text-lg">
        <slot name="description"></slot>
      </p>

      <slot />

      <div
        v-if="!isActive"
        class="absolute z-10 transition-colors duration-100 -inset-2 bg-white/80 dark:bg-neutral-900/80"
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
