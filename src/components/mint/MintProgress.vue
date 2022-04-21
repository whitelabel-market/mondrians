<template>
  <h3 class="text-base font-bold leading-5 text-left w-80">Follow Steps</h3>
  <div class="pb-2 space-y-6">
    <MintStep v-for="(task, index) in tasks" :key="index" :index="index">
      <template v-slot:icon>
        <component
          :is="
            task.isRunning
              ? 'AppLoadingSpinner'
              : task.isError
              ? 'ExclamationCircleIcon'
              : 'CheckIcon'
          "
          class="w-10 h-10 transform"
          :class="
            task.isSuccessful
              ? 'text-blueish translate-x-0.5'
              : task.isError
              ? 'text-red-400 translate-x-0.5'
              : 'text-gray-200 translate-x-0.5'
          "
        />
      </template>
      <template v-slot:name>{{ MINT_TASKS[phase][index].name }}</template>
      <template v-slot:description v-if="!task.isError">{{
        MINT_TASKS[phase][index].description
      }}</template>
      <template v-slot:error v-else>{{ task.error }}</template>
    </MintStep>
  </div>
  <AppButton
    :color="'primary'"
    :size="'sm'"
    @click.prevent="queue.dequeue()"
    v-if="queue.isError"
    >Try again</AppButton
  >
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppButton from "@/components/app/AppButton.vue";
import MintStep from "@/components/mint/MintStep.vue";
import AppLoadingSpinner from "@/components/app/AppLoadingSpinner.vue";
import useQueue from "@/composables/useQueue";
import type { Task } from "@/composables/useTask";
import { CheckIcon, ExclamationCircleIcon } from "@heroicons/vue/outline";
import { MINT_TASKS } from "@/utils/constants";

export default defineComponent({
  components: {
    AppButton,
    MintStep,
    AppLoadingSpinner,
    CheckIcon,
    ExclamationCircleIcon,
  },
  props: {
    phase: {
      type: String,
      required: true,
    },
    tasks: {
      type: Array,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  setup(props) {
    const queue = useQueue();
    props.tasks.forEach((task) => queue.enqueue<Task<any>>(task as Task<any>));
    return { queue, MINT_TASKS };
  },
});
</script>
