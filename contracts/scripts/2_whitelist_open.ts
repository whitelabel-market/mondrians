import { utils } from "ethers";
import { getContract } from "../utils/contract";
import CollectionConfig from "../config/CollectionConfig";

async function main() {
  // Check configuration
  if (CollectionConfig.whitelistAddresses.length < 1) {
    throw "The whitelist is empty, please add some addresses to the configuration.";
  }

  const contract = await getContract();

  // Update sale price (if needed)
  const whitelistPrice = utils.parseEther(
    CollectionConfig.whitelistSale.price.toString()
  );

  if (!(await (await contract.cost()).eq(whitelistPrice))) {
    console.log(
      `Updating the token price to ${CollectionConfig.whitelistSale.price}...`
    );

    await (await contract.setCost(whitelistPrice)).wait();
  }

  // Update max amount per TX (if needed)
  if (
    !(await (
      await contract.maxMint()
    ).eq(CollectionConfig.whitelistSale.maxMintAmountPerTx))
  ) {
    console.log(
      `Updating the max mint amount per TX to ${CollectionConfig.whitelistSale.maxMintAmountPerTx}...`
    );

    await (
      await contract.setMaxMintAmountPerTx(
        CollectionConfig.whitelistSale.maxMintAmountPerTx
      )
    ).wait();
  }

  // Enable whitelist sale (if needed)
  if ((await contract.sellingPhase()) < 1) {
    console.log("Enabling whitelist sale...");

    await (await contract.setPhase(1)).wait();
  }

  console.log("Whitelist Sale has been enabled!");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
