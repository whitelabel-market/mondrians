<template>
  <div
    class="border-4 border-gray-200 rounded-full spinner"
    :class="classes"
  ></div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

const SpinnerSize: () => { [key: string]: string } = () => {
  return {
    xs: "h-4 w-4",
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };
};

const SpinnerColor: { [key: string]: string } = {
  primary: "border-r-blueish",
  secondary: "border-r-gray-400",
};

export default defineComponent({
  props: {
    size: {
      type: String,
      default: "md",
    },
    color: {
      type: String,
      default: "primary",
    },
  },
  setup(props) {
    const classes = computed(() => [
      SpinnerColor[props.color],
      SpinnerSize()[props.size],
    ]);
    return { classes };
  },
});
</script>

<style>
.spinner {
  position: relative;
  margin: auto;
  animation: 0.66s linear 0s infinite normal none running loader;
  transform: translateZ(0px);
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
