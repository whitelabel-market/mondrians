<template>
  <div class="relative">
    <div
      class="relative flex flex-col w-full max-w-xl mx-auto space-y-4 text-center"
    >
      <p class="z-10 text-lg">
        <slot name="description"></slot>
      </p>

      <slot />

      <div
        v-if="!isActive"
        class="absolute z-0 -inset-2 bg-white/80 dark:bg-neutral-900/80"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(["update:modelValue"]);

defineProps({
  isActive: {
    type: Boolean,
    default: true,
  },
});
</script>
