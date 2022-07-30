<template>
  <div class="relative">
    <div class="relative flex flex-col w-full mx-auto space-y-4 text-center">
      <p class="z-20 w-full mx-auto">
        <slot name="description"></slot>
      </p>

      <div :class="{ '!opacity-40 !pointer-events-none': !isActive }">
        <slot />
      </div>
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
