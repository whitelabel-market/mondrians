<template>
  <ClientOnly>
    <TransitionRoot appear :show="modelValue" as="template">
      <Dialog as="div" @close="$emit('update:modelValue', false)">
        <div class="fixed inset-0 overflow-y-auto z-50">
          <div class="h-screen p-8 flex items-center justify-center">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <DialogOverlay class="fixed inset-0 bg-black opacity-30" />
            </TransitionChild>

            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <div class="relative bg-white flex flex-col items-stretch max-h-full py-4 space-y-4 w-full max-w-lg transition-all transform bg-background shadow-xl rounded-2xl">
                <slot />
              </div>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </ClientOnly>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay
} from '@headlessui/vue'

export default defineComponent({
  components: {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogOverlay
  },
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue'],
  setup () {
  }
})
</script>
