<template>
  <TokenCardPrintVue @loaded="(event) => $emit('loaded', event)" />
</template>

<script setup lang="ts">
import TokenCardPrintVue from "@/components/tokens/TokenCardPrint.vue";
import { useHead } from "@vueuse/head";

useHead({
  title: "Screenshot",
});
</script>
