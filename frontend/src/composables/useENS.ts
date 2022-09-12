import CONFIG from "../../../config";
import { ethers } from "ethers";

export interface UseENS {
  provider: ethers.providers.InfuraProvider;
  isName: (name: string | null) => boolean;
  resolveName: (name: string | Promise<string>) => Promise<string | null>;
  lookupAddress: (address: string | Promise<string>) => Promise<string | null>;
  getAvatar: (nameOrAddress: string) => Promise<string | null>;
}

// use homestead provider for utilizing ens data of mainnet
const provider = new ethers.providers.InfuraProvider(
  "homestead",
  CONFIG.infura.id
);

export function useENS(): UseENS {
  const isName = (name: string | null) => !!name && name.endsWith(".eth");

  const resolveName = function (name: string | Promise<string>) {
    return provider.resolveName(name);
  };

  const lookupAddress = function (address: string | Promise<string>) {
    return provider.lookupAddress(address);
  };

  const getAvatar = function (nameOrAddress: string) {
    return provider.getAvatar(nameOrAddress);
  };

  return {
    provider,
    isName,
    resolveName,
    lookupAddress,
    getAvatar,
  };
}
