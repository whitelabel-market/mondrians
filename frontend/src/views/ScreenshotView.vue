<template>
  <TokenCardPrint @loaded="(event) => $emit('loaded', event)" />
</template>

<script setup lang="ts">
import TokenCardPrint from "@/components/tokens/TokenCardPrint.vue";
import { useHead } from "@vueuse/head";

useHead({
  title: "Screenshot",
});
</script>
