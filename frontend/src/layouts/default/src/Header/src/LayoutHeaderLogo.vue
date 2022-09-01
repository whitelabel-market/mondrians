<template>
  <router-link :to="'/'" class="inline-block">
    <MamoLogoIcon
      class="transition-colors duration-200 text-neutral-800 dark:text-neutral-200"
    />
  </router-link>
</template>

<script lang="ts" setup>
import { MamoLogoIcon } from "@/components/Icon";
</script>
