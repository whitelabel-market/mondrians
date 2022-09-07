/**
 * Configure and register global directives
 */
import type { App } from "vue";
import { setupAnimateDirective } from "@/directives/animate";

export function setupGlobDirectives(app: App) {
  setupAnimateDirective(app);
}
