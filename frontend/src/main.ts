import { createApp } from "vue";
import App from "./App.vue";
import { router, setupRouterAndHead } from "./router";
import "@/assets/css/app.css";
import "@/assets/css/fonts.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { setupStore } from "@/store";
import { setupGlobDirectives } from "@/directives";
import { setupGlobComponents } from "@/components/setupGlobComponents";
import { setupRouterGuard } from "@/router/guard";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

async function bootstrap() {
  const app = createApp(App);

  // Configure store
  setupStore(app);

  // Configure app wide directives
  setupGlobDirectives(app);

  // Configure app wide components
  setupGlobComponents(app);

  // Configure routing and head setup
  setupRouterAndHead(app);
  setupRouterGuard(router);

  app.mount("#app");
}

bootstrap();
