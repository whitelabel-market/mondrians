<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center pt-2 space-x-4">
      <div
        class="flex w-10 h-10"
        :class="[
          (status === 'running' || !status) && 'text-gray-200',
          status === 'running' && 'items-center justify-center',
          status === 'error' && 'text-red-500',
          status === 'success' && 'text-blueish',
        ]"
      >
        <slot name="icon"></slot>
      </div>
      <div class="flex flex-col">
        <span class="text-base font-bold leading-5">
          <slot name="name"></slot>
        </span>
        <span class="text-sm font-medium text-left">
          <slot name="description"></slot>
        </span>
        <span class="text-sm font-medium text-left text-red-500">
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
