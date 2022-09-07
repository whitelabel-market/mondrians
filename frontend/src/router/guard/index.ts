import { Router } from "vue-router";
import { createPageLoadingGuard } from "@/router/guard/pageLoadingGuard";

export function setupRouterGuard(router: Router) {
  createPageLoadingGuard(router);
}
