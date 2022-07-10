<template>
  <div class="space-y-4">
    <Disclosure v-for="(step, i) in steps" :key="i" as="div" class="relative">
      <component
        :is="step"
        :index="i"
        :modelValue="modelValue === i"
        @update:modelValue="emit('update:modelValue', $event)"
      />

      <div
        v-if="i < steps.length - 1"
        class="absolute transform translate-y-8 bottom-4 top-8 left-8"
      >
        <!-- <span
          class="block absolute left-0 top-0 h-full border-r-1 w-1 dark:border-white border-black transform -translate-x-1.5"
        >
        </span> -->
      </div>
    </Disclosure>
  </div>
</template>

<script lang="ts" setup>
import { useSlots } from "vue";
import StepperItem from "@/components/stepper/StepperItem.vue";
import { Disclosure } from "@headlessui/vue";

defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["update:modelValue"]);
const slots = useSlots();
const steps = slots.default?.() as unknown as typeof StepperItem[];
</script>

<style scoped></style>
