import { defineStore } from "pinia";
import { ethers } from "ethers";

export interface WalletState {
  provider?: any;
}

export const useWalletStore = defineStore("wallet", {
  state: (): WalletState => ({
    provider: null,
  }),
  actions: {
    async connect(provider: any) {
      const instance = await provider.connect();
      this.provider = new ethers.providers.Web3Provider(instance);
    },
    disconnect() {
      console.error("disconnect not implemented");
      // await this.provider.disconnect()
    },
  },
  getters: {
    signer: (state): ethers.Signer => state.provider?.getSigner(),
    connected: (state): boolean => state.provider != null,
  },
});
