<template>
  <div
    class="pb-8 transition-colors duration-200 pt-28 mondrian-border-b bg-hero-pattern-charlie"
    :class="ClassByVariant[variant]"
  >
    <div class="container px-8 mx-auto">
      <div class="py-24">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  variant: {
    type: String as () => "crimson" | "candlelight" | "dodgerblue",
    default: "candlelight",
  },
});

const ClassByVariant = {
  crimson: "text-neutral-50 bg-crimson-500 dark:bg-crimson-800",
  candlelight: "text-neutral-900 bg-candlelight-500 dark:bg-candlelight-600",
  dodgerblue:
    "text-neutral-900 dark:text-neutral-50 bg-dodgerblue-400 dark:bg-dodgerblue-800",
};
</script>
