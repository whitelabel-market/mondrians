<template>
  <component
    :is="is && is"
    :hover="hover"
    :type="!to && type"
    class="relative block cursor-pointer group transition duration-200 ease-out-circ transform translate-x-1 translate-y-1"
    :to="to && to"
    :href="href && href"
    :disabled="disabled"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    @click.prevent="!(loading || disabled) && $emit('clicked', $event)"
    :class="[!disabled && 'active:scale-[0.98]', fullWidth && 'w-full']"
  >
    <span
      class="flex items-center border font-semibold uppercase transform transition duration-200 ease-out-circ group-hover:translate-x-0 group-hover:translate-y-0"
      :class="[
        ...classes,
        center && 'justify-center',
        !disabled && '-translate-x-1 -translate-y-1',
      ]"
    >
      <AppLoadingSpinner
        v-if="loading"
        :size="'xs'"
        :color="'white'"
      ></AppLoadingSpinner>

      <slot></slot>
    </span>
    <span
      class="block absolute bottom-0 right-0 block -z-10 !bg-white !w-full !h-full border"
      :class="[...classes]"
    ></span>
  </component>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import AppLoadingSpinner from "@/components/app/AppLoadingSpinner.vue";

defineEmits(["clicked"]);
const hover = ref(false);

const ButtonColor: { [key: string]: string } = {
  link: "bg-transparent text-current border-transparent",
  primary: "bg-yellowish text-black border-black",
  secondary: "bg-gray-100 text-gray-500 border-black",
  reddish: "bg-reddish text-white border-black",
  disabled: "cursor-default border-black",
};

const ButtonSize: (
  icon: boolean,
  dense: boolean
) => { [key: string]: string } = (icon, dense) => {
  if (icon) {
    return {
      xs: "w-6 h-6 text-xs",
      sm: "w-10 h-10 text-xs",
      md: "w-12 h-12 text-xs",
      lg: "w-14 h-14 text-sm",
    };
  } else {
    return {
      xs: dense ? "p-1 space-x-1 text-xs" : "h-8 py-2 px-4 space-x-1 text-xs",
      sm: dense ? "p-2 space-x-1 text-xs" : "h-10 py-4 px-6 space-x-2 text-xs",
      md: dense
        ? "py-2 px-4 space-x-2 text-sm"
        : "h-12 py-4 px-8 space-x-2 text-sm",
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
    type: String as () =>
      | "link"
      | "primary"
      | "secondary"
      | "reddish"
      | "disabled"
      | "custom",
    default: "primary",
  },
  rounded: {
    type: String as () =>
      | "none"
      | "sm"
      | "md"
      | "lg"
      | "xl"
      | "2xl"
      | "3xl"
      | "full",
    default: "none",
  },
  size: {
    type: String as () => "xs" | "sm" | "md" | "lg",
    default: "md",
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  dense: {
    type: Boolean,
    default: false,
  },
  center: {
    type: Boolean,
    default: true,
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
  as: {
    type: String as () => "button" | "a" | "router-link",
    default: "button",
  },
});

const classes = computed(() =>
  props.color === "custom"
    ? []
    : [
        !props.disabled ? ButtonColor[props.color] : ButtonColor["disabled"],
        ButtonSize(props.onlyIcon, props.dense)[props.size],
        props.fullWidth && "w-full",
        props.loading && "active:scale-100 cursor-default",
        props.rounded && `rounded-${props.rounded}`,
      ]
);

const is = !props.to ? (!props.href ? "button" : "a") : "router-link";
</script>
