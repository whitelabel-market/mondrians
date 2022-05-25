<template>
  <h3
    class="text-2xl font-bold text-center text-gray-900 dark:text-neutral-200"
  >
    Follow Steps
  </h3>

  <div class="pt-2 pb-6 space-y-6">
    <MintStep
      v-for="(task, index) in (tasks as Task<any>[])"
      :key="index"
      :index="index"
      :status="task.status"
    >
      <template v-slot:icon>
        <div class="flex items-center justify-center w-10">
          <component
            :is="
              task.isRunning
                ? components['AppLoadingSpinner']
                : task.isError
                ? components['ExclamationCircleIcon']
                : components['CheckIcon']
            "
            class="text-current transform"
            :class="[!task.isError && 'translate-x-0.5']"
          />
        </div>
      </template>
      <template v-slot:name>{{
        MINT_TASKS[whitelistEnabled ? Phase.WhitelistSale : Phase.PublicSale][
          index
        ].name
      }}</template>
      <template v-slot:description v-if="!task.isError">{{
        MINT_TASKS[whitelistEnabled ? Phase.WhitelistSale : Phase.PublicSale][
          index
        ].description
      }}</template>
      <template v-slot:error v-else>{{ task.error }}</template>
    </MintStep>
  </div>
  <AppButton full-width @click.prevent="queue.dequeue()" v-if="queue.isError"
    >Try again</AppButton
  >
</template>

<script setup lang="ts">
import AppButton from "@/components/app/AppButton.vue";
import MintStep from "@/components/mint/MintStep.vue";
import AppLoadingSpinner from "@/components/app/AppLoadingSpinner.vue";
import useQueue from "@/composables/useQueue";
import type { Task } from "@/composables/useTask";
import { CheckIcon, ExclamationCircleIcon } from "@heroicons/vue/outline";
import { MINT_TASKS } from "@/utils/constants";

enum Phase {
  PreSale = "presale",
  WhitelistSale = "whitelistsale",
  PublicSale = "publicsale",
  Reveal = "reveal",
}

const components = {
  AppLoadingSpinner,
  CheckIcon,
  ExclamationCircleIcon,
};

const props = defineProps({
  whitelistEnabled: {
    type: Boolean,
    required: true,
  },
  tasks: {
    type: Array,
    required: true,
  },
});

const queue = useQueue();
props.tasks.forEach((task) => queue.enqueue<Task<any>>(task as Task<any>));
</script>
