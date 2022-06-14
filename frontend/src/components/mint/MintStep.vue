<template>
  <div class="flex flex-col space-y-8 items-center">
    <div
      class="flex items-center justify-center w-8 h-8"
      :class="[
        (task.status === 'running' || !task.status) && 'dark:text-neutral-200',
        task.status === 'error' && 'text-red-500',
        task.status === 'success' && 'text-green-500',
      ]"
    >
      <AppLoadingSpinner
        v-if="!(task.isSuccessful || task.isError)"
        :size="'sm'"
        class="text-current transform"
      />
      <ExclamationCircleIcon
        v-if="task.isError"
        class="text-current transform"
      />
      <CheckIcon v-if="task.isSuccessful" class="text-current transform" />
    </div>

    <h2 class="font-black uppercase text-neutral-900 dark:text-neutral-200">
      {{ props.step.title }}
    </h2>

    <div>
      <p class="text-red-500">
        {{ task.error }}
      </p>
      <p class="text-neutral-900 dark:text-neutral-200">
        {{ props.step.description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppLoadingSpinner from "@/components/app/AppLoadingSpinner.vue";
import { CheckIcon, ExclamationCircleIcon } from "@heroicons/vue/outline";
import { MintStepType } from "@/utils/types";
import { toRef } from "vue";

interface Props {
  step: MintStepType;
}

const props = defineProps<Props>();
const task = toRef(props, "step");
</script>
