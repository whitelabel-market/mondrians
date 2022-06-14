<template>
  <TabPanel>
    <slot></slot>
  </TabPanel>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { TabPanel } from "@headlessui/vue";

const props = defineProps({
  title: { type: String, default: "" },
  disabled: { type: Boolean, default: false },
});
</script>
