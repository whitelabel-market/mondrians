<template>
  <div class="space-y-4">
    <Disclosure v-for="(step, i) in steps" :key="i" as="div" class="relative">
      <component
        :is="step"
        :index="i"
        :modelValue="modelValue === i"
        @update:modelValue="emit('update:modelValue', $event)"
      />
    </Disclosure>
  </div>
</template>

<script lang="ts" setup>
import { useSlots } from "vue";
import { MamoStepperItem } from "@/components/Stepper";
import { Disclosure } from "@headlessui/vue";

defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["update:modelValue"]);
const slots = useSlots();
const steps = (slots.default?.() as unknown as typeof MamoStepperItem[]).filter(
  (step) => step.children !== "v-if"
);
</script>
