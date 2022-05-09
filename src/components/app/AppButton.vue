<template>
  <component
    :is="is"
    :hover="hover"
    :type="!isRouterOrAnchorLink && type"
    :to="isRouterLink && to"
    :href="isAnchorLink && href"
    :disabled="disabled"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    @click.prevent="!(loading || disabled) && $emit('clicked', $event)"
    :class="classesWrapper"
  >
    <span :class="classesContent">
      <AppLoadingSpinner
        v-if="loading"
        :size="'xs'"
        :color="'white'"
      ></AppLoadingSpinner>

      <slot></slot>
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import AppLoadingSpinner from "@/components/app/AppLoadingSpinner.vue";

defineEmits(["clicked"]);
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
});

const hover = ref(false);

const ButtonColor: { [key: string]: string } = {
  blank: "bg-transparent text-current border-transparent",
  link: "bg-transparent text-current border-transparent",
  primary: "bg-yellowish text-black border-black",
  secondary: "bg-gray-100 text-gray-500 border-black",
  reddish: "bg-reddish text-white border-black",
  disabled: "border-black",
};

const ButtonWrapperSizeIcon = {
  xs: "w-6 h-6 text-xs",
  sm: "w-10 h-10 text-xs",
  md: "w-12 h-12 text-sm",
  lg: "w-14 h-14 text-base",
};

const ButtonWrapperSizeDefault = {
  xs: "h-8 text-xs",
  sm: "h-10 text-xs",
  md: "h-12 text-sm",
  lg: "h-14 text-base",
};

const ButtonSpacing = {
  xs: "py-2 px-4 space-x-1",
  sm: "py-4 px-6 space-x-2",
  md: "py-4 px-8 space-x-2",
  lg: "py-6 px-14 space-x-2",
};

const classesWrapper = computed(() => [
  `relative flex items-stretch justify-stretch transition duration-200 ease-out-circ`,
  `after:block after:absolute after:bottom-0 after:right-0 after:bg-white after:w-full after:h-full after:border after:border-black after:-z-10`,
  props.disabled && props.loading
    ? "cursor-default"
    : "cursor-pointer group transform translate-x-1 translate-y-1 active:scale-[0.98]",
  props.onlyIcon
    ? ButtonWrapperSizeIcon[props.size]
    : ButtonWrapperSizeDefault[props.size],
  props.fullWidth && "w-full",
  props.rounded && `rounded-${props.rounded} after:rounded-${props.rounded}`,
]);

const classesContent = computed(() => [
  `flex w-full items-center border font-semibold uppercase transform group-hover:translate-x-0 group-hover:translate-y-0 transition duration-200 ease-out-circ`,
  ButtonColor[props.disabled ? "disabled" : props.color],
  !props.onlyIcon && ButtonSpacing[props.size],
  !props.disabled && "-translate-x-1 -translate-y-1",
  props.center || props.onlyIcon ? "justify-center" : "justify-between",
  props.rounded && `rounded-${props.rounded}`,
]);

const isRouterLink = !!props.to;
const isAnchorLink = !!props.href;
const isRouterOrAnchorLink = isRouterLink || isAnchorLink;

const is = (isAnchorLink && "a") || (isRouterLink && "router-link") || "button";
</script>
