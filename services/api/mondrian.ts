import { ethers } from "ethers";
import magicMondrian from "@/utils/abis/MagicMondrian.json";

const whitelistMint = async (
  address: string,
  quantity: number,
  voucher: string,
  price: number
): Promise<void> => {
  //   try {
  //     const signer = this.provider.getSigner();
  //     const creator = await signer.getAddress();
  //     const signedContract = contract.connect(signer);
  //     const tx = await contract
  //       .connect(whitelistKey)
  //       .whitelistMint(address, quantity, voucher, {
  //         value: quantity * Number(price),
  //       });
  //     await tx.wait();
  //   } catch (e: any) {
  //     console.error("Error minting market", e);
  //     throw new Error(e.toString());
  //   }
};
