<script lang="ts">
import { computed, defineComponent, h, ref } from "vue";
import AppLoadingSpinner from "@/components/app/AppLoadingSpinner.vue";
import AppTooltip from "@/components/app/AppTooltip.vue";
import { RouterLink } from "vue-router";

type Indexable<T = any> = {
  [key: string]: T;
};

export default defineComponent({
  emits: ["clicked"],
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
        | "yellowish"
        | "reddish"
        | "blueish"
        | "disabled"
        | "custom",
      default: "yellowish",
    },
    flat: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: String as () => "full" | "xl" | "none",
      default: "xl",
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
  },
  setup(props, { emit, slots }) {
    const hover = ref(false);

    const ButtonColor: Indexable<string> = {
      blank: "bg-transparent text-current border-transparent",
      gray: "border-2 bg-neutral-100 text-gray-500 hover:text-gray-800 border-gray-300",
      link: "bg-gray-100 text-gray-700 border-gray-200 hover:text-blueish",
      reddish: "bg-reddish text-white border-2 border-black",
      yellowish: "bg-yellowish text-black border-2 border-black",
      blueish: "bg-blueish text-white border-2 border-black",
      disabled: "border-2 border-gray-500",
    };

    const ButtonWrapperSizeIcon: Indexable<string> = {
      xs: "w-6 h-6 text-xs",
      sm: "w-7 h-7 text-xs",
      md: "w-10 h-10 text-sm",
      lg: "w-12 h-12 text-base",
    };

    const ButtonWrapperSizeDefault: Indexable<string> = {
      xs: "h-7 text-[0.5rem]",
      sm: "h-9 text-[0.675rem]",
      md: "h-11 text-xs",
      lg: "h-14 text-base",
    };

    const ButtonSpacing: Indexable<string> = {
      xs: "py-1 px-4 space-x-1",
      sm: "py-2 px-6 space-x-2",
      md: "py-3 px-8 space-x-2",
      lg: "py-6 px-14 space-x-2",
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
      xl: "rounded-xl",
      full: "rounded-full",
    };

    const ButtonAfterRounded: Indexable<string> = {
      none: "after:rounded-none",
      xl: "after:rounded-xl",
      full: "after:rounded-full",
    };

    const classesWrapper = computed(() => [
      `relative flex items-stretch justify-stretch font-semibold tracking-wider uppercase transition duration-200 ease-out-circ`,
      ButtonRounded[props.rounded],
      !props.flat &&
        `after:block after:absolute after:bottom-0 after:right-0 after:w-full after:h-full after:border-black after:-z-10`,
      props.color === "gray" ? "after:bg-gray-300" : "after:bg-black",
      !props.flat && ButtonAfterRounded[props.rounded],
      !(props.disabled || props.loading)
        ? "cursor-pointer group transform active:scale-95"
        : "cursor-default",
      !(props.disabled || props.flat) && ButtonAfterTranslate[props.size],
      props.onlyIcon
        ? ButtonWrapperSizeIcon[props.size]
        : ButtonWrapperSizeDefault[props.size],
      props.fullWidth && "w-full",
    ]);

    const classesContent = computed(() => [
      `flex w-full items-center transition duration-200 ease-out-circ`,
      ButtonRounded[props.rounded],
      props.flat ? "hover:bg-opacity-50" : ButtonTranslate[props.size],
      ButtonColor[props.disabled ? "disabled" : props.color],
      !props.onlyIcon && ButtonSpacing[props.size],
      props.onlyIcon || props.center ? "justify-center" : "justify-between",
    ]);

    const classesLoader = computed(() => [
      `absolute inset-0 w-full h-full z-10 flex items-center justify-center transition duration-200 ease-out-circ`,
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
          type: !isRouterOrAnchorLink ? props.type : null,
          "aria-disabled": props.disabled === true ? true : undefined,
          disabled: props.disabled,
          to: isRouterLink ? props.to : null,
          href: isAnchorLink ? props.href : null,
          class: classesWrapper.value,
          onMouseenter: () => {
            hover.value = true;
          },
          onMouseleave: () => {
            hover.value = false;
          },
          onClick: (e: Event) => {
            e.preventDefault();
            if (!(props.disabled || props.loading)) {
              emit("clicked", e);
            }
          },
        },
        [
          h(
            "span",
            { class: classesContent.value },
            slots.default && slots.default()
          ),
          props.loading && loadingNode(),
        ]
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
