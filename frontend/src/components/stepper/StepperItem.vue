<template>
  <div>
    <DisclosureButton
      class="relative w-full space-x-4 flex items-center justify-start p-4 cursor-pointer"
      :class="{ '!opacity-100': modelValue >= index }"
      @click="emit('update:modelValue', index)"
    >
      <div class="flex w-full items-center space-x-4">
        <StepStatus
          :index="index"
          :is-ready="isReady"
          :is-loading="isLoading"
          :error="error"
        />
        <h3 class="font-bold">{{ title }}</h3>
      </div>
    </DisclosureButton>
    <div v-show="modelValue" class="p-8 pl-16">
      <DisclosurePanel static>
        <slot />
      </DisclosurePanel>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType, ref, Ref } from "vue";
import { DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import StepStatus from "@/components/mint/StepStatus.vue";

const emit = defineEmits(["update:modelValue"]);
defineProps({
  title: { type: String, default: "" },
  index: { type: Number, default: -1 },
  modelValue: {
    type: Boolean,
    default: false,
  },
  isReady: {
    type: Object as PropType<Ref<boolean>>,
    default: () => ref(false),
  },
  isLoading: {
    type: Object as PropType<Ref<boolean>>,
    default: () => ref(false),
  },
  error: {
    type: Object as PropType<Ref<unknown>>,
    default: () => ref(null),
  },
});
</script>
