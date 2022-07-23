import CONFIG from "../../config.js";

export const signWhitelist = async (
  chainId,
  contractAddress,
  signerAddress,
  mintingAddress
) => {
  const domain = {
    name: CONFIG.whitelisting.domain,
    version: CONFIG.whitelisting.version,
    chainId,
    verifyingContract: contractAddress,
  };

  const types = {
    Minter: [{ name: "wallet", type: "address" }],
  };

  const sig = await signerAddress._signTypedData(domain, types, {
    wallet: mintingAddress,
  });

  return sig;
};
