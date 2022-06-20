<template>
  <div class="space-y-4">
    <Disclosure v-for="(step, i) in steps" :key="i">
      <DisclosureButton
        class="relative space-x-4 flex items-center justify-start w-full p-4 cursor-pointer"
        :class="{ '!opacity-100': modelValue >= i }"
        @click="emit('update:modelValue', i)"
      >
        <slot name="indicator" :index="i">
          <div
            class="flex rounded-full w-8 h-8 items-center justify-center bg-black text-xs text-white"
          >
            {{ i + 1 }}
          </div>
        </slot>
        <span class="block font-black uppercase">
          {{ step.props.title }}
        </span>
        <!--
            <div
              v-if="i < steps.length - 1"
              class="absolute top-2.5 left-1/2 -right-1/2 transform -translate-y-1/2 z-10"
            >
              <span class="block absolute left-8 right-8 h-px bg-black">
              </span>
            </div>
-->
      </DisclosureButton>
      <div v-show="modelValue === i">
        <DisclosurePanel static>
          <component :is="step" />
        </DisclosurePanel>
      </div>
    </Disclosure>
  </div>
</template>

<script lang="ts" setup>
import { useSlots } from "vue";
import StepperItem from "@/components/stepper/StepperItem.vue";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";

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
