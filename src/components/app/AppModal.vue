<template>
  <TransitionRoot appear :show="modelValue" as="template">
    <Dialog as="div" @close="$emit('update:modelValue', false)">
      <div class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex items-center justify-center h-screen p-8">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay
              class="fixed inset-0 filter backdrop-blur-[5px] bg-[rgb(0,0,0,0.4)]"
            />
          </TransitionChild>

          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 translate-y-12"
            enter-to="opacity-100 translate-y-0"
            leave="duration-200 ease-in"
            leave-from="opacity-100 translate-y-0"
            leave-to="opacity-0 translate-y-12"
          >
            <div
              class="relative flex flex-col items-stretch max-w-lg max-h-full p-6 space-y-4 transition-all transform bg-white shadow-xl bg-background rounded-2xl"
            >
              <slot />
              <AppButton
                :color="'secondary'"
                :size="'sm'"
                @click.prevent="$emit('update:modelValue', false)"
                ><slot name="button">Close</slot></AppButton
              >
            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
} from "@headlessui/vue";
import AppButton from "@/components/app/AppButton.vue";

export default defineComponent({
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay,
    AppButton,
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
});
</script>
