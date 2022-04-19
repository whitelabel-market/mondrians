import { createApp, provide, h } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { apolloClient } from "./services/graphql/index";

import App from "./App.vue";
import router from "./router";
import "@/assets/css/app.css";
import "@/assets/css/fonts.css";

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: () => h(App),
});
app.use(router);
app.mount("#app");
