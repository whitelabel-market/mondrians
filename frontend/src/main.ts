import { createApp, provide, h } from "vue";
import { WalletConnectorVue } from "@whitelabel-solutions/wallet-connector-vue";
import { createToggles, TOGGLE_CONTEXT } from "./composables/useFlags";
import {
  createWalletExtended,
  WALLET_CONTEXT,
} from "./composables/useWalletExtended";
import App from "./App.vue";
import { setupRouter } from "./router";
import "@/assets/css/app.css";
import "@/assets/css/fonts.css";
import animateDirective from "@/directives/animate";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import CONFIG from "@/../../config";
import Notifications from "notiwind";
import { createHead } from "@vueuse/head";
import { setupStore } from "@/store";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

const head = createHead({
  titleTemplate: `Magic Mondrian — %s`,
});

const wallet = WalletConnectorVue({
  appName: "Magic Mondrian",
  infuraId: CONFIG.infura.id,
  chainId: CONFIG.chainId,
  rpcUri: CONFIG.chainList.rpc[2],
  walletconnect: {
    //bridge: "https://bridge.walletconnect.org",
    rpc: { [CONFIG.chainId]: CONFIG.chainList.rpc[2] },
  },
});

const app = createApp({
  setup() {
    provide(TOGGLE_CONTEXT, createToggles());
    provide(WALLET_CONTEXT, createWalletExtended());
  },
  render: () => h(App),
});

// Configure store
setupStore(app);

app.directive("animate", animateDirective);
app.use(wallet);
app.use(head);

// Configure routing
setupRouter(app);

app.use(Notifications);
app.mount("#app");
