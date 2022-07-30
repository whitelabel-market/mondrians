<template>
  <TokenCardPrintVue @loaded="(event) => $emit('loaded', event)" />
</template>

<script setup lang="ts">
import TokenCardPrintVue from "@/components/tokens/TokenCardPrint.vue";
</script>
