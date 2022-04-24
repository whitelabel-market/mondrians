<template>
  <component
    :is="is"
    :type="!to && type"
    class="relative flex items-center font-bold transition-all duration-100 ease-in-out transform cursor-pointer active:scale-[0.98]"
    :class="[...classes, color === 'link' ? '' : 'justify-center']"
    :to="to && to"
    :href="href && href"
    :disabled="props.disabled"
    @click="!(props.loading || props.disabled) && $emit('click', $event)"
  >
    <AppLoadingSpinner
      v-if="loading"
      :size="'xs'"
      :color="'white'"
    ></AppLoadingSpinner>
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { computed } from "vue";
import AppLoadingSpinner from "@/components/app/AppLoadingSpinner.vue";

defineEmits(["click"]);

const ButtonColor: { [key: string]: string } = {
  link: "bg-transparent text-current border-transparent ",
  primary: "bg-yellowish text-gray-900 hover:bg-yellowish/75",
  secondary: "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900",
  reddish: "bg-reddish text-white hover:bg-reddish/75",
};

const ButtonSize: (
  icon: boolean,
  dense: boolean
) => { [key: string]: string } = (icon, dense) => {
  if (icon) {
    return {
      xs: "w-6 h-6 text-xs",
      sm: "w-20 h-20 text-xs",
      md: "w-12 h-12 text-sm",
      lg: "w-14 h-14 text-lg",
    };
  } else {
    return {
      xs: dense ? "p-1 space-x-1 text-xs" : "h-8 py-2 px-4 space-x-1 text-xs",
      sm: dense ? "p-2 space-x-1 text-xs" : "h-10 py-4 px-4 space-x-2 text-xs",
      md: dense
        ? "py-2 px-4 space-x-2 text-sm"
        : "h-12 py-4 px-4 space-x-2 text-sm",
      lg: dense
        ? "py-4 px-8 space-x-2 text-base"
        : "h-14 py-6 px-14 space-x-2 text-base",
    };
  }
};

const props = defineProps({
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
    type: String,
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
});

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
</script>
