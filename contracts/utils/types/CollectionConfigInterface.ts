import NetworkConfigInterface from "./NetworkConfigInterface";

interface SaleConfig {
  price: number;
  maxMintAmountPerTx: number;
}

export default interface CollectionConfigInterface {
  testnet: NetworkConfigInterface;
  mainnet: NetworkConfigInterface;
  contractName: string;
  tokenName: string;
  tokenSymbol: string;
  hiddenMetadataUri: string;
  revealedUri: string | null;
  maxSupply: number;
  maxReserved: number;
  whitelistSale: SaleConfig;
  publicSale: SaleConfig;
  payeesAdresses: string[];
  payeesShares: number[];
  paymentSplitterAddress: string;
  contractAddress: string | null;
  signerAddress: string;
  whitelistAddresses: string[];
}
