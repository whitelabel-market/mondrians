import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "@/utils/constants";
import magicMondrian from "@/utils/abis/MagicMondrian.json";

export default class MondrianInterface {
  private contract: ethers.Contract;
  private signer: ethers.Signer;

  constructor(provider: ethers.providers.Web3Provider) {
    this.signer = provider.getSigner();
    this.contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      magicMondrian.abi,
      provider
    );
  }

  /**
   * Mint new tokens
   * @param quantity Amount of tokens to be minted
   * @param price Price of a token
   * @param signature Voucher to authorize mint in case of Whitelist Sale
   */
  async mint(quantity: number, price: string, signature?: string) {
    try {
      if (!this.signer) {
        throw new Error("Wallet not connected");
      }
      const address = await this.signer.getAddress();
      const signedContract = this.contract.connect(this.signer);

      if (signature) {
        return await this.whitelistMint(
          address,
          signedContract,
          quantity,
          price,
          signature
        );
      }
      return await this.publicMint(address, signedContract, quantity, price);
    } catch (e: any) {
      if (e?.error?.data?.message) {
        throw new Error(e.error.data.message);
      } else if (e?.error?.message) {
        throw new Error(e.error.message);
      } else if (e?.message) {
        throw new Error(e.message);
      } else {
        throw new Error("Something went wrong");
      }
    }
  }

  // Internal mint function for Whitelist Sale
  private async whitelistMint(
    address: string,
    contract: ethers.Contract,
    quantity: number,
    price: string,
    signature: string
  ) {
    const tx = await contract.whitelistMint(address, quantity, signature, {
      value: ethers.utils.parseEther(price).mul(quantity),
    });

    return await tx.wait();
  }

  // Internal mint function for Public Sale
  private async publicMint(
    address: string,
    contract: ethers.Contract,
    quantity: number,
    price: string
  ) {
    const tx = await contract.publicSaleMint(address, quantity, {
      value: ethers.utils.parseEther(price).mul(quantity),
    });

    return await tx.wait();
  }
}
