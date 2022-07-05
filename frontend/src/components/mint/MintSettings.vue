<template>
  <div class="mt-6 lgs:mt-0 lgs:max-w-[454px] mx-auto">
    <div class="flex items-center justify-center w-full mt-4 space-x-4">
      <AppButton
        only-icon
        :disabled="disabled || !canDecrease"
        size="sm"
        @click.prevent="$emit('update:modelValue', modelValue - 1)"
        rounded="full"
      >
        <MinusSmIcon class="w-4 h-4" />
      </AppButton>

      <input
        :value="modelValue"
        readonly
        type="text"
        id="mint"
        name="mint"
        class="block w-20 mx-auto text-center transition-colors duration-300 border-2 rounded-full outline-none focus:ring-0 focus:outline-none cursor-default !border-neutral-800 dark:text-neutral-200 dark:bg-neutral-800 !dark:border-neutral-800"
        :placeholder="modelValue.toString()"
      />

      <AppButton
        only-icon
        size="sm"
        :disabled="disabled || !canIncrease"
        @click.prevent="$emit('update:modelValue', modelValue + 1)"
        rounded="full"
      >
        <PlusSmIcon class="w-4 h-4" />
      </AppButton>
    </div>
    <div
      class="flex items-center justify-center mt-4 space-x-1 font-serif text-lg transition-colors duration-300 dark:text-neutral-200"
    >
      <PolygonIcon class="w-3" />
      <span>{{ Number(price) * modelValue }} </span>
    </div>
    <div class="flex items-center justify-center mt-4">
      <AppButton
        :disabled="disabled || modelValue <= 0"
        @click.prevent="emit('submit', modelValue)"
      >
        <span class="px-8">Mint</span>
      </AppButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import PolygonIcon from "../icons/PolygonIcon.vue";
import AppButton from "@/components/app/AppButton.vue";
import { PlusSmIcon, MinusSmIcon } from "@heroicons/vue/solid";
import { computed } from "vue";
import { MaxMint, Price } from "@/utils/constants";

const emit = defineEmits(["update:modelValue", "submit"]);

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  whitelistEnabled: {
    type: Boolean,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const price = props.whitelistEnabled ? Price.whitelist : Price.default;
const maxMint = props.whitelistEnabled ? MaxMint.whitelist : MaxMint.default;

const canDecrease = computed(() => props.modelValue > 1);
const canIncrease = computed(() => props.modelValue < maxMint);
</script>
