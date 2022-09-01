<template>
  <main class="flex flex-col justify-center flex-1 w-full">
    <router-view @loaded="emit('loaded', $event)" />
  </main>
</template>

<script setup lang="ts">
const emit = defineEmits(["loaded"]);
</script>
