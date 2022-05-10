<template>
  <div class="flex flex-col" :class="[!status && 'opacity-25 cursor-default']">
    <div class="flex items-center space-x-4">
      <div
        class="flex w-8 h-8 items-center justify-center"
        :class="[
          (status === 'running' || !status) && 'text-neutral-200',
          status === 'error' && 'text-red-500',
          status === 'success' && 'text-green-500',
        ]"
      >
        <slot name="icon"></slot>
      </div>
      <div class="flex flex-col justify-start">
        <span class="text-sm uppercase font-black">
          <slot name="name"></slot>
        </span>
        <span class="text-xs">
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
