<template>
  <TransitionRoot appear :show="modelValue" as="template">
    <Dialog as="div" @close="$emit('update:modelValue', false)">
      <div class="fixed inset-0 z-100">
        <div class="flex items-center justify-center h-screen p-4 md:p-8">
          <TransitionChild
            as="template"
            enter="duration-100 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-100 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0 bg-black/50" />
          </TransitionChild>

          <TransitionChild
            as="template"
            enter="duration-100 ease-out"
            enter-from="opacity-0 translate-y-12"
            enter-to="opacity-100 translate-y-0"
            leave="duration-100 ease-in"
            leave-from="opacity-100 translate-y-0"
            leave-to="opacity-0 translate-y-12"
          >
            <div
              class="relative flex flex-col items-stretch w-full max-w-md max-h-full space-y-4 transition-all transform bg-white border-8 border-black shadow-xl dark:bg-neutral-800 text-black dark:text-white bg-hero-pattern-charlie rounded"
            >
              <div class="absolute top-0 right-0 p-2 flex">
                <AppButton
                  size="xs"
                  color="blank"
                  only-icon
                  flat
                  rounded="full"
                  @click.prevent="$emit('update:modelValue', false)"
                  ><slot name="button"><XIcon class="w-4 h-4" /></slot
                ></AppButton>
              </div>

              <div
                class="flex items-center justify-center flex-shrink-0 py-2 px-4 md:px-8"
                v-if="title"
              >
                <h3
                  class="text-2xl font-bold text-center text-neutral-900 dark:text-neutral-200 leading-none"
                >
                  {{ title }}
                </h3>
              </div>

              <div class="flex-1 overflow-auto p-4 md:p-8">
                <slot />
              </div>
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
} from "@headlessui/vue";
import AppButton from "@/components/app/AppButton.vue";
import { XIcon } from "@heroicons/vue/outline";

defineEmits(["update:modelValue"]);
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: false,
  },
});
</script>
