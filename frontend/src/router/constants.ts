export enum PERMISSION_MODE {
  Default,
  Owner,
}

export enum PAGE_LOADING {
  Default,
  Always,
  Never,
}

export const LAYOUT_DEFAULT = () =>
  import("@/layouts/default/LayoutDefault.vue");

export const LAYOUT_BLANK = () => import("@/layouts/blank/LayoutBlank.vue");
