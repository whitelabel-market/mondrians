import { getContract } from "../utils/contract";
import CollectionConfig from "../config/CollectionConfig";

async function main() {
  if (!CollectionConfig.revealedUri) {
    throw "Please add the revealed URI to the configuration.";
  }

  if (
    !CollectionConfig.revealedUri.match(
      /ipfs:\/\/Qm[1-9A-HJ-NP-Za-km-z]{44}\/|ipfs:\/\/b[A-Za-z2-7]{58}\/|ipfs:\/\/B[A-Z2-7]{58}\/|ipfs:\/\/z[1-9A-HJ-NP-Za-km-z]{48}\/|ipfs:\/\/F[0-9A-F]{50}\//
    )
  ) {
    throw "Please add the revealed URI to the configuration.";
  }

  const contract = await getContract();

  // Update baseURI
  console.log("Updating the baseURI...");
  await (await contract.setBaseUri(CollectionConfig.revealedUri)).wait();

  // Revealing the collection (if needed)
  if ((await contract.sellingPhase()) < 3) {
    console.log("Revealing the collection...");

    await (await contract.setPhase(3)).wait();
  }

  console.log("Your collection is now revealed!");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
