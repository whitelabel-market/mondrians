<template>
  <div class="lgs:ml-8 lgs:mt-0 lgs:max-w-[454px] space-y-4" v-animate.stagger>
    <div
      class="mx-auto text-6xl font-black text-center text-transparent md:text-7xl"
    >
      <span
        class="text-transparent bg-clip-text bg-gradient-to-r from-dodgerblue via-candlelight to-crimson"
      >
        {{ whitelistEnabled ? "Whitelist Sale" : "Public Sale" }}
        is live
      </span>
    </div>
    <p
      class="text-2xl font-black text-center transition-colors md:text-3xl md:mt-4 dark:duration-200 dark:text-neutral-200"
    >
      {{ contract.totalSupply }} / {{ contract.maxSupply }}
    </p>
    <div class="flex justify-center">
      <MamoButton color="crimson" to="/mint">Create your own</MamoButton>
    </div>
    <!-- <MintSettings
      :model-value="modelValue"
      @update:modelValue="emit('update:modelValue', $event)"
      :whitelistEnabled="whitelistEnabled"
      @submit="emit('components', $event)"
    /> -->
  </div>
</template>

<script setup lang="ts">
import { MamoButton } from "@/components/Button";
//import MintSettings from "@/components/components/MintSettings.vue";

//const emit = defineEmits(["update:modelValue", "components"]);

defineProps({
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
