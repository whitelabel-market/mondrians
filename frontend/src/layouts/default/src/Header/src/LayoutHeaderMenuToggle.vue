<template>
  <button
    id="mobile-control"
    class="relative w-10 transition-all pointer-events-auto h-7 lg:hidden"
    aria-label="mobile navigation"
    :aria-expanded="getShowMobileMenu"
    aria-controls="mobile-controls"
    :class="{ 'menu-active': getShowMobileMenu }"
    @click.prevent="toggleMobileMenu"
  >
    <span></span>
    <span></span>
    <span class="sr-only">Toggle Menu</span>
  </button>
</template>

<script setup lang="ts">
import { useAppStore } from "@/store/modules/app";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { toggleMobileMenu } = appStore;
const { getShowMobileMenu } = storeToRefs(appStore);
</script>

<style scoped>
#mobile-control span {
  @apply absolute block h-[0.14rem] left-2 right-2 bg-neutral-900 dark:bg-neutral-200 duration-100 ease-out-circ;
}
#mobile-control span:nth-child(1) {
  @apply top-2;
}
#mobile-control span:nth-child(2) {
  @apply bottom-2;
}
#mobile-control.menu-active span {
  @apply transform;
}
#mobile-control.menu-active span:nth-child(1) {
  @apply rotate-45 top-1/2 -translate-y-1/2;
}
#mobile-control.menu-active span:nth-child(2) {
  @apply -rotate-45 bottom-1/2 translate-y-1/2;
}
</style>
