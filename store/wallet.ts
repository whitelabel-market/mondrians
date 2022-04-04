import { defineStore } from 'pinia'

interface WalletState {
  provider?: any;
}

export const useWallet = defineStore('wallet', {
  state: (): WalletState => ({
    provider: null
  }),
  actions: {
    async connect (provider: any) {
      const { $ethers } = useNuxtApp()
      const instance = await provider.connect()
      this.provider = new $ethers.providers.Web3Provider(instance)
    },
    disconnect () {
      console.error('disconnect not implemented')
      // await this.provider.disconnect()
    }

  },
  getters: {
    provider: state => state.provider,
    signer: state => state.provider?.getSigner()
  }
})
