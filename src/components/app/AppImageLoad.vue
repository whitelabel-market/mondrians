<template>
  <slot v-if="loaded" name="image" />
  <slot v-else-if="failed" name="error" />
  <slot v-else-if="loading" name="preloader" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useImage from "@/composables/useImage";

export default defineComponent({
  setup(_, { slots }) {
    const { loaded, failed, loading } = useImage(slots.image && slots.image());

    return { loaded, failed, loading };
  },
});
</script>
