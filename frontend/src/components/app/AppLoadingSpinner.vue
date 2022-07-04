<template>
  <div class="rounded-full spinner" :class="classes"></div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const SpinnerSize: () => { [key: string]: string } = () => {
  return {
    xs: "border-2 h-4 w-4",
    sm: "border-2 h-6 w-6",
    md: "border-2 h-8 w-8",
    lg: "border-4 h-10 w-10",
  };
};

const SpinnerColor: { [key: string]: string } = {
  primary: "border-r-black border-transparent dark:border-r-white",
  secondary: "border-r-gray-400 border-gray-200",
  white: "border-r-transparent border-white",
};

interface Props {
  size?: string;
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  color: "primary",
});

const classes = computed(() => [
  SpinnerColor[props.color],
  SpinnerSize()[props.size],
]);
</script>

<style>
.spinner {
  position: relative;
  animation: 0.66s linear 0s infinite normal none running loader;
  user-select: none;
}

@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
