<script lang="ts">
import { computed, defineComponent, h, ref } from "vue";
import AppLoadingSpinner from "@/components/app/AppLoadingSpinner.vue";
import AppTooltip from "@/components/app/AppTooltip.vue";
import { RouterLink } from "vue-router";

type Indexable<T = any> = {
  [key: string]: T;
};

export default defineComponent({
  emits: ["click"],
  props: {
    type: {
      type: String,
      default: "button",
    },
    color: {
      type: String as () =>
        | "blank"
        | "link"
        | "gray"
        | "candlelight"
        | "crimson"
        | "dodgerblue"
        | "disabled"
        | "custom",
      default: "candlelight",
    },
    flat: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: String as () => "full" | "lg" | "none",
      default: "lg",
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
    tooltip: {
      type: String,
      default: null,
    },
    delay: {
      type: String as () => "100" | "200" | "300" | "400" | "500",
    },
  },
  setup(props, { emit, slots }) {
    const hover = ref(false);

    const ButtonColor: Indexable<string> = {
      blank: "bg-transparent text-current border-transparent",
      gray: "border-2 bg-neutral-100 text-gray-500 hover:text-gray-800 border-neutral-300 dark:bg-neutral-600 dark:border-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100",
      link: "bg-transparent border-transparent",
      crimson:
        "bg-crimson dark:bg-crimson-700 text-neutral-50 border-2 border-neutral-800",
      candlelight:
        "bg-candlelight text-neutral-900 dark:bg-candlelight-600 dark:text-neutral-900 border-2 border-neutral-800",
      dodgerblue: "bg-dodgerblue text-white border-2 border-neutral-800",
      disabled:
        "border-2 border-neutral-200 bg-neutral-100 text-neutral-300 dark:bg-neutral-800 dark:border-neutral-900 dark:text-neutral-900 cursor-not-allowed transition-colors duration-100",
    };

    const ButtonWrapperSizeIcon: Indexable<string> = {
      xs: "w-8 h-8 text-xs",
      sm: "w-10 h-10 text-xs",
      md: "w-14 h-14 text-sm",
      lg: "w-16 h-16 text-base",
    };

    const ButtonWrapperSizeDefault: Indexable<string> = {
      xs: "h-8 text-xs",
      sm: "h-10 text-xs",
      md: "h-14 text-sm",
      lg: "h-16 text-base",
    };

    const ButtonSpacing: Indexable<string> = {
      xs: props.color === "blank" ? "py-1 space-x-1" : "py-1 px-4 space-x-1",
      sm: props.color === "blank" ? "py-2 space-x-2" : "py-2 px-6 space-x-2",
      md: props.color === "blank" ? "py-3 space-x-2" : "py-3 px-8 space-x-2",
      lg: props.color === "blank" ? "py-6 space-x-2" : "py-6 px-14 space-x-2",
    };

    const ButtonTranslate: Indexable<string> = {
      xs: "transform group-hover:translate-x-1 group-hover:translate-y-1",
      sm:
        props.rounded === "full"
          ? "transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
          : "transform group-hover:translate-x-1 group-hover:translate-y-1",
      md: "transform group-hover:translate-x-1 group-hover:translate-y-1",
      lg: "transform group-hover:translate-x-1 group-hover:translate-y-1",
    };

    const ButtonAfterTranslate: Indexable<string> = {
      xs: "after:transform after:translate-x-1 after:translate-y-1",
      sm:
        props.rounded === "full"
          ? "after:transform after:translate-x-0.5 after:translate-y-0.5"
          : "after:transform after:translate-x-1 after:translate-y-1",
      md: "after:transform after:translate-x-1 after:translate-y-1",
      lg: "after:transform after:translate-x-1 after:translate-y-1",
    };

    const ButtonRounded: Indexable<string> = {
      none: "rounded-none",
      lg: "rounded",
      full: "rounded-full",
    };

    const ButtonAfterRounded: Indexable<string> = {
      none: "after:rounded-none",
      lg: "after:rounded",
      full: "after:rounded-full",
    };

    const classesWrapper = computed(() => [
      `relative inline-flex items-stretch justify-stretch font-semibold uppercase`,
      ButtonRounded[props.rounded],
      !props.flat &&
        !props.disabled &&
        `after:block after:absolute after:bottom-0 after:right-0 after:w-full after:h-full after:border-neutral-800 after:-z-10`,
      props.color === "gray" && !props.disabled
        ? "after:bg-neutral-300 dark:after:bg-neutral-800"
        : "after:bg-neutral-800",
      !props.flat && ButtonAfterRounded[props.rounded],
      !(props.disabled || props.loading)
        ? "cursor-pointer group transform active:scale-[97%]"
        : "cursor-default",
      !(props.disabled || props.flat) && ButtonAfterTranslate[props.size],
      props.onlyIcon
        ? ButtonWrapperSizeIcon[props.size]
        : ButtonWrapperSizeDefault[props.size],
      props.fullWidth && "w-full",
    ]);

    const classesContent = computed(() => [
      `flex w-full items-center transition-transform duration-100`,
      ButtonRounded[props.rounded],
      props.flat ? "" : ButtonTranslate[props.size],
      ButtonColor[props.disabled ? "disabled" : props.color],
      !props.onlyIcon && ButtonSpacing[props.size],
      props.onlyIcon || props.center ? "justify-center" : "justify-between",
    ]);

    const classesLoader = computed(() => [
      `absolute inset-0 w-full h-full z-10 flex items-center justify-center transition duration-100`,
      props.loading ? "block" : "hidden",
      ButtonRounded[props.rounded],
      ButtonColor[props.color],
    ]);

    const isRouterLink = !!props.to;
    const isAnchorLink = !!props.href;
    const isRouterOrAnchorLink = isRouterLink || isAnchorLink;

    const tag: any = isAnchorLink ? "a" : isRouterLink ? RouterLink : "button";

    const loadingNode = () =>
      h(
        "span",
        { class: classesLoader.value },
        h(AppLoadingSpinner, { size: "xs", color: "white" })
      );

    const buttonNode = () =>
      h(
        tag,
        {
          hover: hover.value,
          type: !isRouterOrAnchorLink ? props.type : undefined,
          "aria-disabled": props.disabled === true ? true : undefined,
          disabled: props.disabled,
          target: isAnchorLink ? "_blank" : undefined,
          to: isRouterLink ? props.to : undefined,
          href: isRouterOrAnchorLink ? props.href || props.to : undefined,
          class: classesWrapper.value,
          onMouseenter: () => {
            hover.value = true;
          },
          onMouseleave: () => {
            hover.value = false;
          },
          onClick: (e: Event) => {
            !isAnchorLink && e.preventDefault();
            if (!(props.disabled || props.loading)) {
              emit("click", e);
            }
          },
        },
        {
          default: () => [
            h(
              "span",
              { class: classesContent.value },
              slots.default && slots.default()
            ),
            props.loading && loadingNode(),
          ],
        }
      );

    const buttonNodeWithTooltip = () =>
      h(
        AppTooltip,
        {
          show: hover.value,
        },
        {
          element: buttonNode,
          text: () => props.tooltip,
        }
      );

    return props.tooltip ? buttonNodeWithTooltip : buttonNode;
  },
});
</script>
