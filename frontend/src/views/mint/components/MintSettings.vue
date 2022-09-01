<template>
  <div class="mt-6 lgs:mt-0 lgs:max-w-[454px] mx-auto">
    <div class="flex items-center justify-center w-full mt-4 space-x-4">
      <MamoButton
        only-icon
        :disabled="disabled || !canDecrease"
        size="sm"
        @click.prevent="$emit('update:modelValue', modelValue - 1)"
        rounded="full"
      >
        <MinusSmIcon class="w-4 h-4" />
      </MamoButton>

      <div
        class="transition-colors duration-200 bg-white rounded-full dark:bg-neutral-800"
      >
        <input
          :value="modelValue"
          readonly
          type="text"
          id="mint"
          name="mint"
          class="block w-20 mx-auto text-center transition-colors duration-200 bg-transparent border-2 rounded-full outline-none cursor-default dark:duration-200 border-neutral-800 dark:border-neutral-900 focus:ring-0 focus:outline-none dark:text-neutral-200 text-neutral-800"
          :placeholder="modelValue.toString()"
        />
      </div>

      <MamoButton
        only-icon
        size="sm"
        :disabled="disabled || !canIncrease"
        @click.prevent="$emit('update:modelValue', modelValue + 1)"
        rounded="full"
      >
        <PlusSmIcon class="w-4 h-4" />
      </MamoButton>
    </div>
    <div
      class="flex items-center justify-center mt-4 space-x-1 italic font-semibold"
    >
      <PolygonIcon class="w-3" />
      <span
        class="transition-colors duration-200 text-neutral-800 dark:text-neutral-200"
        >{{ Number(price) * modelValue }}
      </span>
    </div>
    <div class="flex items-center justify-center mt-4">
      <MamoButton
        :disabled="disabled || modelValue <= 0"
        @click.prevent="emit('submit', modelValue)"
      >
        <span class="px-8">Mint</span>
      </MamoButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PolygonIcon } from "@/components/Icon";
import { MamoButton } from "@/components/Button";
import { PlusSmIcon, MinusSmIcon } from "@heroicons/vue/solid";
import { computed, watch } from "vue";
import { MaxMint, Price } from "@/utils/constants";
import { useMagicKeys } from "@vueuse/core";

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

const { enter } = useMagicKeys();

watch(enter, (v) => {
  if (v) emit("submit", props.modelValue);
});
</script>
