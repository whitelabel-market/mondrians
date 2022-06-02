import { createApp, provide, h } from "vue";
import { WalletConnectorVue } from "@whitelabel-solutions/wallet-connector-vue";
import { createToggles, TOGGLE_CONTEXT } from "./composables/useFlags";
import {
  createWalletExtended,
  WALLET_CONTEXT,
} from "./composables/useWalletExtended";
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
    provide(TOGGLE_CONTEXT, createToggles());
    provide(WALLET_CONTEXT, createWalletExtended());
  },
  render: () => h(App),
});

app.directive("animate", animateDirective);

app.use(
  WalletConnectorVue({
    appName: "Magic Mondrian",
    infuraId: "3f6ed0b245824ed7ba603a0d01e52a4b",
    chainId: 80001,
  })
);
app.use(router);
app.mount("#app");
