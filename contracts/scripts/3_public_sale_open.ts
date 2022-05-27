import { utils } from "ethers";
import { getContract } from "../utils/contract";
import CollectionConfig from "../config/CollectionConfig";

async function main() {
  const contract = await getContract();

  // Update sale price (if needed)
  const publicSalePrice = utils.parseEther(
    CollectionConfig.publicSale.price.toString()
  );

  if (!(await (await contract.cost()).eq(publicSalePrice))) {
    console.log(
      `Updating the token price to ${CollectionConfig.publicSale.price}...`
    );

    await (await contract.setCost(publicSalePrice)).wait();
  }

  // Update max amount per TX (if needed)
  if (
    !(await (
      await contract.maxMint()
    ).eq(CollectionConfig.publicSale.maxMintAmountPerTx))
  ) {
    console.log(
      `Updating the max mint amount per TX to ${CollectionConfig.publicSale.maxMintAmountPerTx}...`
    );

    await (
      await contract.setMaxMintAmountPerTx(
        CollectionConfig.publicSale.maxMintAmountPerTx
      )
    ).wait();
  }

  // Enable whitelist sale (if needed)
  if ((await contract.sellingPhase()) !== 2) {
    console.log("Enabling public sale...");

    await (await contract.setPhase(2)).wait();
  }

  console.log("Public Sale sale has been enabled!");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
