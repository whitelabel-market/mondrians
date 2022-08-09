<template>
  <div class="shadow-default w-full">
    <div
      v-if="modelValue"
      class="rounded flex items-start justify-start space-x-4 w-full border p-4"
      :class="WrapperClass[variant]"
    >
      <div class="flex-shrink-0" :class="IconClass[variant]">
        <slot name="icon"
          ><component class="w-6 h-6" :is="IconByVariant[variant]"
        /></slot>
      </div>
      <div class="flex-1 space-y-0.5">
        <div v-if="title">
          <h4 class="font-semibold">{{ title }}</h4>
        </div>
        <div>
          <div class="line-clamp-6">
            <slot />
          </div>

          <span class="block text-xs" v-if="variant === 'error' && report">
            If you need any further assistance
            <a
              :href="`mailto:${CONFIG.supportEmail}?subject=Error report from ${address}&body=Hello,%0D%0A%0D%0APlease insert your custom message for the Mondrian support here!.%0D%0A%0D%0A%0D%0A%0D%0APlease find attached the official error report:%0D%0A%0D%0A${report}`"
              class="underline"
              >report this incident</a
            >
            and we will reach out to you.
          </span>
        </div>
      </div>
      <div class="flex-shrink-0 text-neutral-900 dark:text-neutral-50">
        <button @click="emit('update:modelValue', false)">
          <XIcon class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  CheckCircleIcon,
  InformationCircleIcon,
  ExclamationCircleIcon,
  XIcon,
} from "@heroicons/vue/outline";
import CONFIG from "@/../../config";
import { useWallet } from "@whitelabel-solutions/wallet-connector-vue";

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  variant: {
    type: String as () => "success" | "error" | "info",
    default: "error",
  },
  title: {
    type: String,
    default: null,
  },
  report: {
    type: String,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue"]);

const { address } = useWallet();

const IconByVariant = {
  success: CheckCircleIcon,
  error: ExclamationCircleIcon,
  info: InformationCircleIcon,
};

const IconClass = {
  success: "text-green-600 dark:text-green-400 ",
  error: "text-red-600 dark:text-red-400 ",
  info: "text-neutral-900 dark:text-neutral-50 ",
};

const WrapperClass = {
  success:
    "bg-green-50 border-green-600 dark:bg-green-900 dark:border-green-600",
  error: "bg-red-50 border-red-200 dark:bg-red-900 dark:border-red-600",
  info: "bg-neutral-50 border-neutral-900 dark:bg-neutral-800 dark:border-neutral-100",
};
</script>
