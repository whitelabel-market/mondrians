import { createApp, provide, h } from "vue";
import { createWallet, WALLET_CONTEXT } from "./composables/useWallet";

import App from "./App.vue";
import router from "./router";
import "@/assets/css/app.css";
import "@/assets/css/fonts.css";

const app = createApp({
  setup() {
    provide(WALLET_CONTEXT, createWallet());
  },
  render: () => h(App),
});
app.use(router);
app.mount("#app");
