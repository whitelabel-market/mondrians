<template>
  <div
    class="fixed z-30 flex items-center justify-center w-full h-screen bg-white dark:bg-neutral-900"
    v-if="getPageLoading"
  >
    <LayoutLoaderIcon class="w-10 h-10" />
  </div>
</template>

<script lang="ts" setup>
import LayoutLoaderIcon from "./LayoutLoaderIcon.vue";
import { useAppStore } from "@/store/modules/app";
import { storeToRefs } from "pinia";

const { getPageLoading } = storeToRefs(useAppStore());
</script>
