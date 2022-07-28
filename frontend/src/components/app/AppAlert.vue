<template>
  <div class="shadow-default w-full">
    <div
      v-if="modelValue"
      class="rounded flex items-start justify-start space-x-4 w-full border p-4"
      :class="WrapperClass[variant]"
    >
      <div class="flex-shrink-0" :class="IconClass[variant]">
        <slot name="icon"
          ><component class="w-6 h-6" :is="IconByVariant[variant]"
        /></slot>
      </div>
      <div class="flex-1 text-neutral-900 dark:text-neutral-50">
        <div v-if="title">
          <h4 class="font-bold">{{ title }}</h4>
        </div>
        <div>
          <slot />
        </div>
      </div>
      <div class="flex-shrink-0 text-neutral-900 dark:text-neutral-50">
        <button @click="emit('update:modelValue', false)">
          <XIcon class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XIcon,
} from "@heroicons/vue/outline";

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String as () => "success" | "error" | "info",
    default: "error",
  },
  title: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue"]);

const IconByVariant = {
  success: CheckCircleIcon,
  error: ExclamationCircleIcon,
  info: InformationCircleIcon,
};

const IconClass = {
  success: "text-green-600 dark:text-green-400",
  error: "text-red-600 dark:text-red-400",
  info: "text-neutral-900 dark:text-neutral-50",
};

const WrapperClass = {
  success:
    "bg-green-50 border-green-600 dark:bg-green-900 dark:border-green-400",
  error: "bg-red-100 border-red-600 dark:bg-red-900 dark:border-red-400",
  info: "bg-neutral-50 border-neutral-900 dark:bg-neutral-900 dark:border-neutral-100",
};
</script>
