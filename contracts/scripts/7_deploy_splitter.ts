import { ethers } from "hardhat";
import ContractArguments from "../config/ContractArguments";
import CollectionConfig from "../config/CollectionConfig";

async function main() {
  const SplitPayments = await ethers.getContractFactory("SplitPayments");

  const splitPayments = await SplitPayments.deploy(
    [
      "0xe3bbf29f034fA780407Fd11dac7A0B3938b1bc6a",
      "0xB9dBCb4DE7ECE32007310eB5FEbdeCc50D6Ab28c",
    ],
    [50, 50]
  );

  await splitPayments.deployed();

  console.log("Contract address:", splitPayments.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
