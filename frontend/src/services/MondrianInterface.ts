import { ethers } from "ethers";
import CONFIG from "../../../config.js";
import magicMondrian from "@/utils/abis/MagicMondrian.json";

interface txOptions {
  txWait: boolean;
}
interface MintParams {
  quantity: number;
  price: string;
  signature?: string;
}

type MintOptions = txOptions;

interface PrintParams {
  token: any;
  address: string;
}

type PrintOptions = txOptions;

export default class MondrianInterface {
  private contract: ethers.Contract;
  private signer: ethers.Signer;
  private provider: ethers.providers.Web3Provider;

  constructor(provider: ethers.providers.Web3Provider) {
    this.provider = provider;
    this.signer = provider.getSigner();
    this.contract = new ethers.Contract(
      CONFIG.contract,
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
  async mint(params: MintParams, options?: MintOptions) {
    try {
      if (!this.signer) {
        throw new Error("Wallet not connected");
      }
      const isWhitelistMint = !!params.signature;
      const address = await this.signer.getAddress();
      const signedContract = await this.contract.connect(this.signer);
      const tx = await this[isWhitelistMint ? "whitelistMint" : "publicMint"](
        params,
        address,
        signedContract
      );
      if (options?.txWait) {
        await tx.wait();
      }
      return tx;
    } catch (e: any) {
      const error: any = {};
      Object.keys(e).forEach((key) => {
        error[key] = e[key];
      });
      throw error;
    }
  }

  // Internal mint function for Whitelist Sale
  private async whitelistMint(
    { quantity, price, signature }: MintParams,
    address: string,
    contract: ethers.Contract
  ) {
    return contract.whitelistMint(address, quantity, signature, {
      value: ethers.utils.parseEther(price).mul(quantity),
    });
  }

  // Internal mint function for Public Sale
  private async publicMint(
    { quantity, price }: MintParams,
    address: string,
    contract: ethers.Contract
  ) {
    return contract.publicSaleMint(address, quantity, {
      value: ethers.utils.parseEther(price).mul(quantity),
    });
  }

  // Function to send ether/matic to contract for printing
  async print({ token, address }: PrintParams, options?: MintOptions) {
    const contractApi = new ethers.Contract(
      CONFIG.contract,
      [
        "function printPrice() public view returns (uint256)",
        "function hasPrintedOnce(address, uint256) public view returns (bool)",
      ],
      this.provider
    );

    try {
      if (!this.signer) {
        throw new Error("Wallet not connected");
      }

      const priceHex = await contractApi.printPrice();
      const price = ethers.utils.formatEther(priceHex);
      // return if already printed and let backend decide
      const hasPayedForPrint = await contractApi.hasPrintedOnce(
        address,
        token.id
      );
      if (hasPayedForPrint) return;

      const contract = await this.contract.connect(this.signer);
      const tx = await contract.print(token.id, {
        value: ethers.utils.parseEther(price),
      });
      if (options?.txWait) {
        await tx.wait();
      }

      return tx;
    } catch (e: any) {
      const error: any = {};
      Object.keys(e).forEach((key) => {
        error[key] = e[key];
      });
      throw error;
    }
  }
}
