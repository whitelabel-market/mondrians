<template>
  <div :class="['flex items-center justify-center w-8 h-8']">
    <span
      v-if="showIndex"
      class="flex items-center justify-center w-8 h-8 bg-black text-xs text-white rounded-full"
      >{{ index + 1 }}</span
    >
    <AppLoadingSpinner
      v-if="loading"
      :size="'sm'"
      class="text-current transform"
    />
    <ExclamationCircleIcon v-if="error" class="text-red-500" />
    <CheckIcon v-if="success" class="text-green-500" />
  </div>
</template>

<script setup lang="ts">
import AppLoadingSpinner from "@/components/app/AppLoadingSpinner.vue";
import { CheckIcon, ExclamationCircleIcon } from "@heroicons/vue/outline";
import { TaskStatus } from "@/composables/useTask";
import { computed, PropType } from "vue";

const props = defineProps({
  index: {
    type: Number,
    required: true,
  },
  status: {
    type: String as PropType<TaskStatus>,
    default: null,
  },
});

const loading = computed(() => props.status === TaskStatus.RUNNING);
const success = computed(() => props.status === TaskStatus.SUCCESS);
const error = computed(() => props.status === TaskStatus.ERROR);
const showIndex = computed(
  () => !(success.value || loading.value || error.value)
);
</script>
