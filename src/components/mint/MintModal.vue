<template>
  <AppModal
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
  >
    <div class="px-8 py-4 space-y-4">
      <h3 class="text-2xl font-bold text-left">Follow Steps</h3>
      <ul class="pb-2 space-y-6">
        <li class="flex items-center pt-2 space-x-8">
          <div class="flex items-center justify-center w-10 h-10">
            <AppLoadingSpinner :size="8" :color="'text-blue-600'" />
          </div>
          <div class="flex flex-col">
            <span class="text-lg font-semibold text-left"> Authenticate </span>
            <span class="text-sm text-left rounded-xl">
              Check if address is eligible for whitelist sale.
            </span>
          </div>
        </li>
        <li class="flex items-center space-x-8">
          <CheckIcon
            class="w-10 h-10 text-gray-400 transform translate-x-0.5"
          />
          <div class="flex flex-col">
            <span class="text-lg font-semibold text-left"> Voucher </span>
            <span class="text-sm text-left rounded-xl">
              Receive voucher for current address to mint.
            </span>
          </div>
        </li>
        <li class="flex items-center space-x-8">
          <CheckIcon
            class="w-10 h-10 text-gray-400 transform translate-x-0.5"
          />
          <div class="flex flex-col">
            <span class="text-lg font-semibold text-left"> Mint </span>
            <span class="text-sm text-left rounded-xl">
              Send transaction to mint your Mondrian.
            </span>
          </div>
        </li>
      </ul>
      <button
        class="w-full py-2 text-lg font-semibold text-center bg-yellowish rounded-xl"
        @click.prevent="$emit('update:modelValue', false)"
      >
        Cancel
      </button>
    </div>
  </AppModal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppModal from "@/components/app/AppModal.vue";
import AppLoadingSpinner from "@/components/app/AppLoadingSpinner.vue";
import { CheckIcon } from "@heroicons/vue/outline";

export default defineComponent({
  components: {
    AppModal,
    AppLoadingSpinner,
    CheckIcon,
  },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["update:modelValue"],
});
</script>
