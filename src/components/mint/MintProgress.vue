<template>
  <h3 class="text-base font-bold leading-5 text-left w-80">Follow Steps</h3>
  <div class="pb-2 space-y-6">
    <MintStep v-for="(task, index) in tasks" :key="index" :index="index">
      <template v-slot:icon>
        <AppLoadingSpinner v-if="task.isRunning" />
        <component
          v-else
          :is="task.isError ? 'ExclamationCircleIcon' : 'CheckIcon'"
          class="w-10 h-10 transform translate-x-0.5"
          :class="
            task.isSuccessful
              ? 'text-blueish'
              : task.isError
              ? 'text-red-400'
              : 'text-gray-200'
          "
        />
      </template>
      <template v-slot:name>{{ MINT_TASKS[phase][index].name }}</template>
      <template v-slot:description>{{
        task.isError
          ? "Error while trying to connect"
          : MINT_TASKS[phase][index].description
      }}</template>
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
    props.tasks.forEach((task: any) => queue.enqueue(task));
    return { queue, MINT_TASKS };
  },
});
</script>
