<template>
  <div class="flex flex-col w-full space-y-4">
    <div class="flex items-center justify-between">
      <div class="flex gap-4 items center">
        <ArrowNarrowLeftIcon class="w-5 h-5" />
        <div class="text-base font-bold leading-5">Select a wallet</div>
      </div>
      <XIcon
        role="button"
        class="w-5 h-5 cursor-pointer"
        @click.prevent="$emit('update:modelValue', false)"
      />
    </div>

    <div class="flex flex-col gap-4">
      <div class="p-4 border rounded-lg">
        <div class="flex items-center w-full gap-4 text-left">
          <div>
            <AppLoadingSpinner :size="'xs'" />
          </div>
          <div class="text-base font-bold leading-5 text-high-emphesis">
            <span
              class="jsx-106137454 after:inline-block dots after:animate-ellipsis after:w-4 after:text-left"
              >Initializing</span
            >
          </div>
        </div>
      </div>
      <div
        role="button"
        class="flex items-center justify-between w-full gap-4 px-4 py-3 border rounded-lg bg-gray-50 focus:outline-none"
      >
        <div class="flex flex-col gap-1">
          <div id="wallet-option-MetaMask" class="flex items-center">
            <div class="text-sm font-bold leading-5">MetaMask</div>
          </div>
          <div class="text-xs font-medium leading-4 currentColor">
            Easy-to-use browser extension.
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center">
      <span class="text-xs font-medium leading-4 text-secondary"
        >New to Ethereum?
        <span class="text-xs font-medium leading-4 text-blue"
          ><a
            target="_blank"
            rel="noopener noreferrer"
            href="https://ethereum.org/wallets/"
            class="text-baseline whitespace-nowrap text-blue opacity-80 hover:opacity-100 focus:opacity-100"
            tabindex="0"
            >Learn more about wallets</a
          ></span
        ></span
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { XIcon, ArrowNarrowLeftIcon } from "@heroicons/vue/solid";
import AppLoadingSpinner from "@/components/app/AppLoadingSpinner.vue";

export default defineComponent({
  components: {
    AppLoadingSpinner,
    XIcon,
    ArrowNarrowLeftIcon,
  },
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["update:modelValue"],
  setup() {
    const loading = ref(false);

    return { loading };
  },
});
</script>
