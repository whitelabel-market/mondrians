<template>
  <div :class="['flex items-center justify-center w-8 h-8']">
    <AppLoadingSpinner
      v-if="isLoading.value"
      :size="'sm'"
      class="text-current transform"
    />
    <ExclamationCircleIcon v-else-if="error.value" class="text-red-500" />
    <CheckIcon v-else-if="isReady.value" class="text-green-500" />
    <span
      v-else
      class="flex items-center justify-center w-8 h-8 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-full font-bold"
      >{{ index + 1 }}</span
    >
  </div>
</template>

<script setup lang="ts">
import AppLoadingSpinner from "@/components/app/AppLoadingSpinner.vue";
import { CheckIcon, ExclamationCircleIcon } from "@heroicons/vue/outline";
import { PropType, ref, Ref } from "vue";

defineProps({
  index: {
    type: Number,
    required: true,
  },
  isReady: {
    type: Object as PropType<Ref<boolean>>,
    required: true,
  },
  isLoading: {
    type: Object as PropType<Ref<boolean>>,
    required: true,
  },
  error: {
    type: Object as PropType<Ref<Error | null>>,
    required: true,
  },
});
</script>
