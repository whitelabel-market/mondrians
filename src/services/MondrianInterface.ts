import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "@/utils/constants";
import magicMondrian from "@/utils/abis/MagicMondrian.json";
import { useWalletStore } from "@/store/useWallet";
import { toRaw } from "vue";

export default class MondrianInterface {
  async whitelistMint(quantity: number, signature: string) {
    const { provider } = useWalletStore();
    try {
      if (!provider) {
        throw new Error("Wallet not connected");
      }
      const signer = toRaw(provider).getSigner();
      const address = await signer?.getAddress();
      const price = 0.0025;

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        magicMondrian.abi,
        signer
      );
      const signedContract = contract.connect(signer);

      const tx = await signedContract.whitelistMint(
        address,
        quantity,
        signature,
        {
          value: ethers.utils.parseEther(price.toString()).mul(quantity),
        }
      );
      await tx.wait();
    } catch (e: any) {
      throw new Error(e.toString());
    }
  }

  async publicMint(quantity: number) {
    const { provider } = useWalletStore();

    try {
      if (!provider) {
        throw new Error("Connect wallet");
      }
      const signer = toRaw(provider).getSigner();
      const address = await signer.getAddress();
      const price = 0.005;

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        magicMondrian.abi,
        signer
      );
      const signedContract = contract.connect(signer);

      const tx = await signedContract.publicMint(address, quantity, {
        value: ethers.utils.parseEther(price.toString()).mul(quantity),
      });
      await tx.wait();
    } catch (e: any) {
      throw new Error(e.toString());
    }
  }
}
