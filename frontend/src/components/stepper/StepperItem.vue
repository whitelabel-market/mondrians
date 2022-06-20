<template>
  <div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

defineProps({
  title: { type: String, default: "" },
  disabled: { type: Boolean, default: false },
});
</script>
