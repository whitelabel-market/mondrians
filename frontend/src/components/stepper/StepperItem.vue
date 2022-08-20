<template>
  <div>
    <DisclosureButton
      class="relative flex items-center justify-start w-full p-4 space-x-4 transition cursor-pointer hover:opacity-60"
      @click="emit('update:modelValue', index)"
    >
      <div class="flex items-center w-full space-x-4">
        <StepStatus
          :index="index"
          :isLoading="isLoading"
          :isReady="isReady"
          :error="error"
        />
        <h3
          class="font-bold transition-colors duration-200 text-neutral-800 dark:text-neutral-200"
        >
          {{ title }}
        </h3>
      </div>
    </DisclosureButton>
    <Transition @enter="onEnter" @leave="onLeave" :css="false">
      <div v-if="modelValue" class="p-8">
        <DisclosurePanel static>
          <div
            class="space-y-4 transition-colors duration-200 dark:text-neutral-200"
          >
            <AppAlert
              title="Something went wrong"
              v-model="showError"
              :report="errorMessage"
            >
              <p>{{ errorMessage }}</p>
            </AppAlert>

            <slot :index="index" />
          </div>
        </DisclosurePanel>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType, ref, Ref, unref, watch } from "vue";
import { DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import StepStatus from "@/components/mint/StepStatus.vue";
import { gsap } from "gsap";
import AppAlert from "@/components/app/AppAlert.vue";
import { getError } from "@/utils/error";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
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
    type: Object as PropType<Ref<Error | object | null>>,
    default: ref(null),
  },
});

const showError = ref(false);

const toggle = (el: HTMLElement, height: string) =>
  gsap.to(el, { height, duration: 0.1, ease: "power1.inOut" });

const onEnter = async (el: HTMLElement, done: any) =>
  toggle(el, "auto").then(done);

const onLeave = async (el: HTMLElement, done: any) =>
  toggle(el, "0").then(done);

watch(props.error, () => {
  showError.value = !!props.error;
});

const errorMessage = computed(() => getError(unref(props.error)));
</script>
