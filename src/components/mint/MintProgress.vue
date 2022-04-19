<template>
  <h3 class="text-base font-bold leading-5 text-left">Follow Steps</h3>
  <ul class="pb-2 space-y-6">
    <li
      v-for="(step, index) in steps[phase]"
      :key="step.name"
      :index="index"
      class="flex items-center pt-2 space-x-4"
    >
      <MintStep :step="step">
        <template v-slot:name>{{ step.name }}</template>
        <template v-slot:description>{{ step.description }}</template>
      </MintStep>
    </li>
  </ul>
  <AppButton
    :color="'secondary'"
    :size="'sm'"
    @click.prevent="$emit('update:modelValue', false)"
    >Close</AppButton
  >
</template>

<script lang="ts">
import AppButton from "@/components/app/AppButton.vue";
import MintStep from "@/components/mint/MintStep.vue";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    AppButton,
    MintStep,
  },
  props: {
    steps: {
      type: Object,
      required: true,
    },
    phase: {
      type: String,
      required: true,
    },
  },
  emits: ["update:modelValue"],
});
</script>
