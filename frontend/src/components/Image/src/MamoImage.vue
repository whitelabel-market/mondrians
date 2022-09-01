<template>
  <slot
    v-if="loaded"
    :loading="loading"
    :loaded="loaded"
    :failed="failed"
    name="image"
  />
  <slot v-else-if="failed" name="error" />
  <slot v-else-if="loading" name="preloader"
    ><MamoLoader :size="size" :color="color"
  /></slot>
</template>

<script setup lang="ts">
import { watch, useSlots } from "vue";
import { MamoLoader } from "@/components/Loader";
import useImage from "@/composables/useImage";

const emits = defineEmits(["loaded"]);

defineProps({
  size: {
    type: String as () => "xs" | "sm" | "md" | "lg",
    default: "xs",
  },
  color: {
    type: String as () => "primary" | "secondary" | "white",
    default: "primary",
  },
});

const slots = useSlots();

const { loaded, failed, loading } = useImage(
  slots.image && slots.image({ loading: false, loaded: false, failed: false })
);

watch(loaded, () => {
  if (loaded.value === true) emits("loaded");
});
</script>

<style>
* {
  shape-rendering: crispEdges;
}
</style>
