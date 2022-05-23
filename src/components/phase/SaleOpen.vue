<template>
  <div class="lgs:ml-8 mt-6 lgs:mt-0 lgs:max-w-[454px]">
    <div
      class="mx-auto text-5xl font-black text-center text-transparent md:text-6xl"
    >
      <span
        class="text-transparent outline outline-1 bg-clip-text bg-gradient-to-r from-blueish via-yellowish to-reddish"
      >
        <span>
          {{ whitelistEnabled ? "Whitelist Sale" : "Public Sale" }}
        </span>
        <span class="inline-block"> is live </span>
      </span>
    </div>
    <p class="mt-2 font-bold text-center md:text-3xl md:mt-4">
      {{ contract.totalSupply }} of {{ contract.maxSupply }}
    </p>
    <div class="flex items-center justify-center w-full mt-4 space-x-4">
      <AppButton
        only-icon
        :disabled="!canDecrease"
        size="md"
        @click.prevent="$emit('decrease')"
        rounded="full"
      >
        <MinusSmIcon class="w-4 h-4" />
      </AppButton>

      <input
        :value="quantity"
        readonly
        type="text"
        id="mint"
        name="mint"
        class="block w-20 mx-auto text-center placeholder-gray-500 border-2 border-gray-700 rounded-full cursor-not-allowed focus:outline-none"
        :placeholder="quantity.toString()"
      />

      <AppButton
        only-icon
        :disabled="!canIncrease"
        @click.prevent="$emit('increase')"
        rounded="full"
      >
        <PlusSmIcon class="w-4 h-4" />
      </AppButton>
    </div>
    <p
      class="flex items-center justify-center mt-4 space-x-1 text-sm font-semibold"
    >
      <span>Price: {{ Number(price) * quantity }} </span>
      <PolygonIcon class="w-2.5" />
    </p>
    <div class="flex items-center justify-center mt-4">
      <AppButton
        :disabled="quantity === 0"
        @click.prevent="
          !isConnected
            ? $emit('update:showConnectModal', true)
            : $emit('update:modelValue', true)
        "
      >
        <span class="px-8"> Mint </span>
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import PolygonIcon from "../icons/PolygonIcon.vue";
import AppButton from "@/components/app/AppButton.vue";
import { PlusSmIcon, MinusSmIcon } from "@heroicons/vue/solid";
import { computed } from "vue";

defineEmits([
  "increase",
  "decrease",
  "update:modelValue",
  "update:showConnectModal",
]);

const props = defineProps({
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
  contract: {
    type: Object,
    required: true,
  },
  isConnected: {
    type: Boolean,
    required: true,
  },
});

const canDecrease = computed(() => props.quantity > 0);
const canIncrease = computed(
  () => props.quantity < (props.whitelistEnabled ? 5 : 10)
);
</script>
