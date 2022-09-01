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
              class="relative flex flex-col items-stretch w-full max-w-md max-h-full text-black transition-all transform bg-white border-4 border-black rounded shadow-xl dark:bg-neutral-800 text-color bg-hero-pattern-charlie"
            >
              <div
                class="absolute flex items-start justify-between text-sm rounded top-2 right-2"
              >
                <MamoButton
                  size="xs"
                  color="blank"
                  only-icon
                  flat
                  rounded="full"
                  @click.prevent="$emit('update:modelValue', false)"
                  ><slot name="button"
                    ><XIcon
                      class="w-5 h-5 text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200" /></slot
                ></MamoButton>
              </div>
              <div
                class="flex items-center justify-center flex-shrink-0 py-2 pt-4 md:pt-8"
                v-if="title"
              >
                <h3
                  class="text-2xl font-bold leading-none text-center text-color"
                >
                  {{ title }}
                </h3>
              </div>

              <slot />
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
import { MamoButton } from "@/components/Button";
import { XIcon } from "@heroicons/vue/solid";

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
