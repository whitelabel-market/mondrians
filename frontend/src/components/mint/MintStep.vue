<template>
  <div class="relative">
    <div
      class="flex flex-col space-y-4 text-center w-full max-w-xl mx-auto relative"
    >
      <p class="text-lg z-10">
        <slot name="description"></slot>
      </p>

      <slot />

      <div v-if="!isActive" class="absolute -inset-2 bg-white/80 z-0" />
    </div>
  </div>
</template>

<script setup lang="ts">
import StepperItem from "@/components/stepper/StepperItem.vue";
import { PropType, ref, Ref } from "vue";

const emit = defineEmits(["update:modelValue"]);
defineProps({
  isActive: {
    type: Boolean,
    default: true,
  },
});
</script>
