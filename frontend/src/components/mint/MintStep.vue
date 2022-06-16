<template>
  <StepperItem :title="title">
    <div
      class="flex flex-col space-y-8 items-center text-center w-full max-w-lg mx-auto"
    >
      <div
        v-if="showIndicator"
        :class="[
          'flex flex-col items-center justify-center',
          !!loading && 'dark:text-neutral-200',
          !!error && 'text-red-500',
          !error & !loading && 'text-green-500',
        ]"
      >
        <div class="w-8 h-8">
          <AppLoadingSpinner
            v-if="loading"
            :size="'sm'"
            class="text-current transform"
          />
          <ExclamationCircleIcon
            v-if="!!error"
            class="text-current transform"
          />
          <CheckIcon v-if="!loading && !error" class="text-current transform" />
        </div>
        <div v-if="!!error">
          <p class="text-xs mt-2">
            {{ error.message }}
          </p>
        </div>
      </div>

      <h2 class="font-black uppercase text-neutral-900 dark:text-neutral-200">
        {{ title }}
      </h2>

      <p class="text-neutral-900 dark:text-neutral-200">
        <slot name="description"></slot>
      </p>

      <slot />
    </div>
  </StepperItem>
</template>

<script setup lang="ts">
import StepperItem from "@/components/stepper/StepperItem.vue";
import { computed } from "vue";
import AppLoadingSpinner from "@/components/app/AppLoadingSpinner.vue";
import { CheckIcon, ExclamationCircleIcon } from "@heroicons/vue/outline";

const props = defineProps({
  task: {
    type: Object,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
});

const showIndicator = computed(() => props.task !== undefined);

const loading = computed(
  () => !(props.task?.isError || props.task?.isSuccessful)
);

const error = computed(() => props.task?.error);
</script>
