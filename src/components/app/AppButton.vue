<template>
  <component
    :is="is"
    :type="!to && type"
    class="relative inline-flex items-center justify-center font-bold transition-all duration-100 ease-in-out transform cursor-pointer active:scale-[0.98]"
    :class="classes"
    :to="to && to"
    :href="href && href"
    :disabled="props.disabled"
    @click="!(props.loading || props.disabled) && $emit('click', $event)"
  >
    <AppLoadingSpinner
      v-if="loading"
      class="mr-2 pointer-events-none -ml-7"
    ></AppLoadingSpinner>
    <slot></slot>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import AppLoadingSpinner from "@/components/app/AppLoadingSpinner.vue";
const ButtonColor: { [key: string]: string } = {
  link: "bg-transparent text-current border-transparent hover:opacity-60 !rounded-none",
  primary: "bg-yellowish text-gray-900 hover:bg-yellowish/75",
  secondary: "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900",
};
const ButtonSize: (
  icon: boolean,
  dense: boolean
) => { [key: string]: string } = (icon, dense) => {
  if (icon) {
    return {
      xs: "w-6 h-6 text-xs",
      sm: "w-10 h-10 text-xs",
      md: "w-12 h-12 text-sm",
      lg: "w-14 h-14 text-lg",
    };
  } else {
    return {
      xs: dense ? "p-1 space-x-1 text-xs" : "h-8 py-2 px-4 space-x-1 text-xs",
      sm: dense ? "p-2 space-x-1 text-xs" : "h-10 py-4 px-4 space-x-2 text-xs",
      md: dense
        ? "py-2 px-4 space-x-2 text-sm"
        : "h-12 py-4 px-12 space-x-2 text-sm",
      lg: dense
        ? "py-4 px-8 space-x-2 text-base"
        : "h-14 py-6 px-14 space-x-2 text-base",
    };
  }
};
export default defineComponent({
  components: { AppLoadingSpinner },
  emits: ["click"],
  props: {
    type: {
      type: String,
      default: "button",
    },
    color: {
      type: String,
      default: "primary",
    },
    rounded: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: "md",
    },
    fullWidth: {
      type: Boolean,
      default: true,
    },
    dense: {
      type: Boolean,
      default: false,
    },
    onlyIcon: {
      type: Boolean,
      default: false,
    },
    to: {
      type: Object || String,
      default: null,
    },
    href: {
      type: String,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const classes = computed(() => [
      !props.disabled && ButtonColor[props.color],
      ButtonSize(props.onlyIcon, props.dense)[props.size],
      props.fullWidth && "w-full",
      props.loading &&
        "active:scale-100 cursor-default hover:opacity-100 hover:border-2",
      props.rounded ? "rounded-xl" : "rounded",
      props.disabled &&
        "disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed",
    ]);
    const is = !props.to ? (!props.href ? "button" : "a") : "router-link";
    return { classes, is, props };
  },
});
</script>
