<template>
  <div class="flex flex-col" :class="[!status && 'opacity-25 cursor-default']">
    <div class="flex items-center space-x-4">
      <div
        class="flex items-center justify-center w-8 h-8"
        :class="[
          (status === 'running' || !status) && 'dark:text-neutral-200',
          status === 'error' && 'text-red-500',
          status === 'success' && 'text-green-500',
        ]"
      >
        <slot name="icon"></slot>
      </div>
      <div class="flex flex-col justify-start">
        <span
          class="text-sm font-black uppercase text-neutral-900 dark:text-neutral-200"
        >
          <slot name="name"></slot>
        </span>
        <span class="text-xs text-neutral-900 dark:text-neutral-200">
          <slot name="description"></slot>
        </span>
        <span class="text-xs text-red-500">
          <slot name="error"></slot>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  status: {
    type: String,
    default: "",
  },
});
</script>
