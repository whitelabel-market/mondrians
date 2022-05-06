<template>
  <div class="lgs:ml-8 mt-6 lgs:mt-0 lgs:max-w-[454px]">
    <div class="font-bold text-7xl font-serif relative z-10 text-center">
      {{ whitelistEnabled ? "Whitelist Sale" : "Public Sale" }}
      is live
    </div>
    <p class="mt-2 font-bold text-center md:text-3xl md:mt-4">
      {{ contract.totalSupply }} of {{ contract.maxSupply }}
    </p>
    <div class="flex items-center justify-center w-full mt-4 space-x-4">
      <button
        class="w-10 h-10 transition-all duration-200 ease-in-out transform rounded-full active:scale-95"
        :class="
          canDecrease
            ? 'bg-yellowish ease-in text-gray-900'
            : 'bg-gray-200 ease-out text-gray-400 cursor-not-allowed'
        "
        :disabled="!canDecrease"
        @click.prevent="$emit('decrease')"
      >
        -
      </button>
      <input
        :value="quantity"
        readonly
        type="text"
        id="mint"
        name="mint"
        class="block w-20 mx-auto text-center placeholder-gray-500 border-2 border-gray-700 rounded-full cursor-not-allowed focus:outline-none"
        :placeholder="quantity.toString()"
      />
      <button
        class="w-10 h-10 transition-all duration-200 ease-in-out transform rounded-full active:scale-95"
        :class="
          canIncrease
            ? 'bg-yellowish ease-in text-gray-900'
            : 'bg-gray-200 ease-out text-gray-400 cursor-not-allowed'
        "
        :disabled="!canIncrease"
        @click.prevent="$emit('increase')"
      >
        +
      </button>
    </div>
    <p
      class="flex items-center justify-center mt-4 space-x-1 text-sm font-semibold"
    >
      <span>Price: {{ price * quantity }} </span>
      <PolygonIcon class="w-2.5" />
    </p>
    <div class="flex items-center justify-center mt-4">
      <AppButton
        :size="'md'"
        :disabled="quantity === 0"
        :fullWidth="false"
        class="px-8"
        @click.prevent="
          !isConnected
            ? $emit('update:showConnectModal', true)
            : $emit('update:modelValue', true)
        "
      >
        Mint
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import PolygonIcon from "../icons/PolygonIcon.vue";
import AppButton from "@/components/app/AppButton.vue";

defineEmits([
  "increase",
  "decrease",
  "update:modelValue",
  "update:showConnectModal",
]);

defineProps({
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  whitelistEnabled: {
    type: Boolean,
    required: true,
  },
  publicsaleEnabled: {
    type: Boolean,
    required: true,
  },
  canDecrease: {
    type: Boolean,
    required: true,
  },
  canIncrease: {
    type: Boolean,
    required: true,
  },
  contract: {
    type: Object,
    required: true,
  },
  isConnected: {
    type: Boolean,
    required: true,
  },
});
</script>
