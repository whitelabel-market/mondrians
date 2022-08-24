<template>
  <AppModal
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    title="Confirm transaction"
  >
    <div
      class="flex flex-col items-center w-full px-4 pt-4 pb-4 space-y-4 md:px-8 md:pb-8"
    >
      <div>
        <AppLoadingSpinner size="sm" />
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
          <div>
            <div v-if="task">
              <h3 class="font-bold">{{ task }}</h3>
            </div>
            <div class="inline-flex items-center space-x-0.5" v-if="price">
              <PolygonIcon class="block w-4 h-4" />
              <span class="block">{{ price }} </span>
            </div>
          </div>
        </div>
      </div>
      <slot />
    </div>
  </AppModal>
</template>

<script setup lang="ts">
import AppModal from "@/components/app/AppModal.vue";
import AppLoadingSpinner from "@/components/app/AppLoadingSpinner.vue";
import PolygonIcon from "@/components/icons/PolygonIcon.vue";

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
</script>
