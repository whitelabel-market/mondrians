<template>
  <div>
    <DisclosureButton
      class="relative w-full space-x-4 flex items-center justify-start p-4 cursor-pointer transition ease-in-circ duration-200 hover:opacity-60"
      @click="emit('update:modelValue', index)"
    >
      <div class="flex w-full items-center space-x-4">
        <StepStatus
          :index="index"
          :isLoading="isLoading"
          :isReady="isReady"
          :error="error"
        />
        <h3 class="font-bold">{{ title }}</h3>
      </div>
    </DisclosureButton>
    <Transition @enter="onEnter" @leave="onLeave" :css="false">
      <div v-show="modelValue" class="p-8 pl-16">
        <DisclosurePanel static>
          <div class="space-y-4">
            <div v-if="!!error.value" class="text-center text-red-500">
              <p>{{ error.value }}</p>
            </div>
            <slot :index="index" />
          </div>
        </DisclosurePanel>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { PropType, ref, Ref } from "vue";
import { DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import StepStatus from "@/components/mint/StepStatus.vue";
import { gsap } from "gsap";

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
    default: ref(false),
  },
  isLoading: {
    type: Object as PropType<Ref<boolean>>,
    default: ref(false),
  },
  error: {
    type: Object as PropType<Ref<Error | null>>,
    default: ref(null),
  },
});

const toggle = (el: HTMLElement, height: string) =>
  gsap.to(el, { height, duration: 0.1, ease: "power1.inOut" });

const onEnter = async (el: HTMLElement, done: any) =>
  toggle(el, "auto").then(done);

const onLeave = async (el: HTMLElement, done: any) =>
  toggle(el, "0").then(done);
</script>
