import { defineStore } from "pinia";
import { ethers } from "ethers";
import { walletInterface } from "@/services";

export interface WalletState {
  provider?: ethers.providers.Web3Provider | null;
}

export const useWalletStore = defineStore("wallet", {
  state: (): WalletState => ({
    provider: null,
  }),
  actions: {
    async connect(provider: any) {
      try {
        this.provider = await walletInterface.connectWallet(provider);
      } catch (e) {
        console.error(e);
      }
    },
    disconnect() {
      console.error("disconnect not implemented");
      // await walletInterface.disconnectWallet()
    },
  },
  getters: {
    connected: (state): boolean => state.provider != null,
  },
});
