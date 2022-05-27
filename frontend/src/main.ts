import { createApp, provide, h } from "vue";
import { createWallet, WALLET_CONTEXT } from "./composables/useWallet";
import { createToggles, TOGGLE_CONTEXT } from "./composables/useFlags";
import App from "./App.vue";
import router from "./router";
import "@/assets/css/app.css";
import "@/assets/css/fonts.css";
import animateDirective from "@/directives/animate";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

const app = createApp({
  setup() {
    provide(WALLET_CONTEXT, createWallet());
    provide(TOGGLE_CONTEXT, createToggles());
  },
  render: () => h(App),
});

app.directive("animate", animateDirective);

app.use(router);
app.mount("#app");
