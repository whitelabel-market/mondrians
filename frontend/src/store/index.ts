import type { App } from "vue";
import { createPinia } from "pinia";
import { WalletConnectorVue } from "@whitelabel-solutions/wallet-connector-vue";
import CONFIG from "@/../../config";

const store = createPinia();

export const wallet = WalletConnectorVue({
  appName: "Magic Mondrian",
  infuraId: CONFIG.infura.id,
  chainId: CONFIG.chainId,
  rpcUri: CONFIG.chainList.rpc[2],
  walletconnect: {
    rpc: { [CONFIG.chainId]: CONFIG.chainList.rpc[2] },
  },
});

export function setupStore(app: App<Element>) {
  app.use(wallet);
  app.use(store);
}

export { store };
