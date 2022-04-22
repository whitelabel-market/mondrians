<template>
  <slot v-if="loaded" name="image" />
  <slot v-else-if="failed" name="error" />
  <slot v-else-if="loading" name="preloader" />
</template>

<script setup lang="ts">
import { watch, useSlots } from "vue";
import useImage from "@/composables/useImage";

const emits = defineEmits(["loaded"]);
const slots = useSlots();
const { loaded, failed, loading } = useImage(slots.image && slots.image());

watch(loaded, () => {
  if (loaded.value === true) emits("loaded");
});
</script>
