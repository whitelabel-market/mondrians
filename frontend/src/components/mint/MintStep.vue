<template>
  <StepperItem :title="title">
    <div class="flex flex-col text-center space-y-4 w-full max-w-xl mx-auto">
      <p>
        <slot name="description"></slot>
      </p>

      <div class="relative w-full">
        <div v-if="!active" class="absolute -inset-2 bg-white/80 z-10" />
        <slot />
      </div>
    </div>
  </StepperItem>
</template>

<script setup lang="ts">
import StepperItem from "@/components/stepper/StepperItem.vue";
import { PropType } from "vue";
import { TaskStatus } from "@/composables/useTask";

const props = defineProps({
  active: {
    type: Boolean,
    default: null,
  },
  status: {
    type: String as PropType<TaskStatus>,
    default: null,
  },
  index: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
</script>
