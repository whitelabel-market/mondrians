import type { App } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import routes from "@/router/routes";
import scrollBehavior from "@/router/scrollBehavior";

// app router
export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  strict: true,
  scrollBehavior,
});

// config router
export function setupRouter(app: App<Element>) {
  app.use(router);
}
