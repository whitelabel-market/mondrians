import { LAYOUT_DEFAULT, LAYOUT_BLANK } from "@/router/constants";
import { RouteRecordRaw } from "vue-router";

const withLayout = (
  record: RouteRecordRaw,
  layoutComponent: RouteRecordRaw["component"]
) => ({
  ...record,
  name: `Layout${String(record.name)}`,
  component: layoutComponent,
  children: [{ ...record }],
});

export const withLayoutDefault = (record: RouteRecordRaw) =>
  withLayout(record, LAYOUT_DEFAULT);

export const withLayoutBlank = (record: RouteRecordRaw) =>
  withLayout(record, LAYOUT_BLANK);
