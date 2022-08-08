<template>
  <AppModal
    :modelValue="modelValue"
    @update:modelValue="$emit('update:modelValue', $event)"
    title="Confirm transaction"
  >
    <div class="flex flex-col w-full space-y-4 items-center">
      <div>
        <AppLoadingSpinner size="sm" />
      </div>

      <div>
        <p>You'll be asked to approve the transaction from your wallet</p>
      </div>

      <div
        class="shadow-default border border-black self-stretch"
        v-if="task || price"
      >
        <div
          class="rounded text-sm flex items-start justify-between p-4 dark:bg-neutral-900 bg-white"
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

const props = defineProps({
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
