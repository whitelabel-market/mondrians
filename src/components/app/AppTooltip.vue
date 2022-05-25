<template>
  <div class="relative cursor-pointer">
    <slot name="element" :show="show && !disabled"></slot>
    <TransitionRoot
      appear
      :show="show && !disabled"
      as="template"
      :enter="`transition duration-200 ease-out origin-bottom transform delay-${delay}`"
      enter-from="scale-95 translate-y-0.5 opacity-0"
      enter-to="scale-100 translate-y-0 opacity-100"
      leave="transition ease-in duration-100 delay-0"
      leave-from="opacity-100"
      leave-to="opacity-0"
    >
      <span
        class="absolute inset-x-0 bottom-full mb-2.5 justify-center whitespace-nowrap flex"
      >
        <span
          class="px-3 py-1 text-xs font-medium text-neutral-200 bg-neutral-900 rounded-md filter drop-shadow-md"
        >
          <svg
            aria-hidden="true"
            width="16"
            height="6"
            viewBox="0 0 16 6"
            class="absolute -mt-px -ml-2 text-gray-900 left-1/2 top-full"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15 0H1V1.00366V1.00366V1.00371H1.01672C2.72058 1.0147 4.24225 2.74704 5.42685 4.72928C6.42941 6.40691 9.57154 6.4069 10.5741 4.72926C11.7587 2.74703 13.2803 1.0147 14.9841 1.00371H15V0Z"
              fill="currentColor"
            ></path>
          </svg>
          <slot name="text"></slot>
        </span>
      </span>
    </TransitionRoot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { TransitionRoot } from "@headlessui/vue";
import { useMediaQuery } from "@vueuse/core";

defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  delay: {
    type: [String as () => "0" | "200" | "500", Number as () => 0 | 200 | 500],
    default: "0",
  },
});

const disabled = ref(false);
const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");

onMounted(() => {
  if (!canHover.value) disabled.value = true;
});
</script>
