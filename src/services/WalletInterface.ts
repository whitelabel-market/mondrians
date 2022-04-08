import { ethers } from "ethers";

/**
 * exposes an interface for interaction with the wallet
 */
export default class WalletInterface {
  /**
   * Connect wallet by creating instance via wallet-connector lib.
   * @param provider IProvider provider to connect to.
   */
  async connectWallet(provider: any): Promise<ethers.providers.Web3Provider> {
    try {
      const instance = await provider.connect();
      return new ethers.providers.Web3Provider(instance);
    } catch (e: any) {
      throw new Error(e.toString());
    }
  }

  /**
   * function to disconnect from wallet and clear active account
   */
  // async disconnectWallet(): Promise<void> {
  //   try {
  //     const { provider } = useWalletStore();
  //     await provider?.disconnect();
  //   } catch (e: any) {
  //     throw new Error(e.toString());
  //   }
  // }
}
