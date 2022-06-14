<template>
  <TabPanel class="p-8">
    <slot></slot>
  </TabPanel>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { TabPanel } from "@headlessui/vue";

defineProps({
  title: { type: String, default: "" },
  disabled: { type: Boolean, default: false },
});
</script>
