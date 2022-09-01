import { RouteRecordRaw } from "vue-router";

import HomeRoute from "@/router/routes/home";
import MintRoute from "@/router/routes/mint";
import UserRoute from "@/router/routes/user";
import ScreenshotRoute from "@/router/routes/screenshot";
import LegalRoute from "@/router/routes/legal";

const routeModuleList = [
  HomeRoute,
  MintRoute,
  UserRoute,
  ScreenshotRoute,
  LegalRoute,
];

export default [
  // PAGE_NOT_FOUND_ROUTE,
  ...routeModuleList,
] as unknown as RouteRecordRaw[];
