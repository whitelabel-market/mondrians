import { ethers } from "hardhat";
import ContractArguments from "../config/ContractArguments";
import CollectionConfig from "../config/CollectionConfig";

async function main() {
  const MagicMondrian = await ethers.getContractFactory(
    CollectionConfig.contractName
  );

  const wallet = ethers.Wallet.createRandom();

  console.log("Signer public key:", wallet.address);
  console.log(
    "!!! Please save this private key carefully to create vouchers:",
    wallet.privateKey,
    "!!!"
  );

  const magicMondrian = await MagicMondrian.deploy(
    ContractArguments[0],
    ContractArguments[1],
    wallet.address,
    ContractArguments[3]
  );

  await magicMondrian.deployed();

  console.log("Contract address:", magicMondrian.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
