import { getContract } from "../utils/contract";

async function main() {
  const contract = await getContract();

  if (await contract.paused()) {
    console.log(`Unpausing all trades...`);

    await (await contract.unpause()).wait();
  }

  console.log("All trades are being unpaused!");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
