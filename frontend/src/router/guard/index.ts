import { Router } from "vue-router";
import { createPageLoadingGuard } from "@/router/guard/pageLoadingGuard";
import { createMobileMenuGuard } from "@/router/guard/mobileMenuGuard";

export function setupRouterGuard(router: Router) {
  createPageLoadingGuard(router);
  createMobileMenuGuard(router);
}
