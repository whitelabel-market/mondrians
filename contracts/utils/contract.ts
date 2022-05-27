import CollectionConfig from "../config/CollectionConfig";
import { ethers } from "hardhat";
import type { MagicMondrian } from "../typechain";

export const getContract = async () => {
  if (null === CollectionConfig.contractAddress) {
    throw "Please add the contract address to the configuration before running this command.";
  }

  if (
    (await ethers.provider.getCode(CollectionConfig.contractAddress)) === "0x"
  ) {
    throw `Can't find a contract deployed to the target address: ${CollectionConfig.contractAddress}`;
  }

  // Attach to deployed contract
  const contract = (await ethers.getContractAt(
    CollectionConfig.contractName,
    CollectionConfig.contractAddress
  )) as MagicMondrian;

  return contract;
};
