<template>
  <div class="lgs:ml-8 mt-6 lgs:mt-0 lgs:max-w-[454px]">
    <div
      class="mx-auto text-6xl font-black text-center text-transparent md:text-7xl"
    >
      <span
        class="text-transparent bg-clip-text bg-gradient-to-r from-blueish via-yellowish to-reddish"
      >
        <span>
          {{ whitelistEnabled ? "Whitelist Sale" : "Public Sale" }} is live
        </span>
      </span>
    </div>
    <p
      class="mt-2 text-2xl font-bold text-center transition-colors duration-300 md:text-3xl md:mt-4 dark:text-neutral-200"
    >
      {{ contract.totalSupply }} of {{ contract.maxSupply }}
    </p>
    <MintSettings
      :model-value="modelValue"
      @update:modelValue="emit('update:modelValue', $event)"
      :whitelistEnabled="whitelistEnabled"
      @submit="emit('mint', $event)"
    />
  </div>
</template>

<script setup lang="ts">
import MintSettings from "@/components/mint/MintSettings.vue";

const emit = defineEmits(["update:modelValue", "mint"]);

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  contract: {
    type: Object,
    required: true,
  },
  whitelistEnabled: {
    type: Boolean,
    required: true,
  },
});
</script>
