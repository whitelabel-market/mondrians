import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "@/utils/constants";
import magicMondrian from "@/utils/abis/MagicMondrian.json";

class MondrianInterface {
  private provider: ethers.providers.Web3Provider;

  constructor(provider: ethers.providers.Web3Provider) {
    this.provider = provider;
  }

  async whitelistMint(quantity: number, signature: string) {
    try {
      const signer = this.provider.getSigner();
      const address = await signer.getAddress();
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
    try {
      const signer = this.provider.getSigner();
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

export default MondrianInterface;
