<template>
  <MamoModal
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    title="Confirm transaction"
  >
    <div
      class="flex flex-col items-center w-full px-4 pt-4 pb-4 space-y-4 md:px-8 md:pb-8"
    >
      <div>
        <MamoLoader size="sm" />
      </div>
      <div>
        <p class="text-center">
          Please approve the transaction from within your wallet for the
          following price.
        </p>
      </div>

      <div
        class="self-stretch border border-black shadow-default"
        v-if="task || price"
      >
        <div
          class="flex items-start justify-between p-4 text-sm bg-white rounded dark:bg-neutral-900"
        >
          <div class="w-full">
            <div v-if="task">
              <h3 class="font-bold">{{ task }}</h3>
            </div>
            <div class="grid grid-cols-2 items-center" v-if="price">
              <div class="inline-flex items-center space-x-0.5">
                <PolygonIcon class="block w-4 h-4" />
                <span class="block">{{ price }} </span>
              </div>
              <div class="inline-flex items-center space-x-0.5">
                <span class="block">$</span>
                <span class="block">{{ maticToUsd(price, 5) }} </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <slot />
    </div>
  </MamoModal>
</template>

<script setup lang="ts">
import { MamoModal } from "@/components/Modal";
import { MamoLoader } from "@/components/Loader";
import { PolygonIcon } from "@/components/Icon";
import { useCurrency } from "@/composables/useCurrency";

defineEmits(["update:modelValue"]);

defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  task: {
    type: String,
    required: false,
  },
  price: {
    type: String,
    required: false,
  },
});

const { maticToUsd } = useCurrency();
</script>
