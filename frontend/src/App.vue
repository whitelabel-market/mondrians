<template>
  <MamoAppProvider>
    <router-view />
  </MamoAppProvider>
</template>

<script lang="ts" setup>
import { MamoAppProvider } from "@/components/Application";
</script>
