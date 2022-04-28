export type Account = {
  id: string;
};

export type Contract = {
  id: string;
  name: string;
  symbol: string;
  paused: boolean;
  supportsMetadata: boolean;
  maxSupply: number;
  maxReserved: number;
  totalSupply: number;
  tokens?: Token[];
};

export type Token = {
  id: string;
  imageURI: string;
  createdAtTimestamp: string;
  createdAtBlockNumber: string;
  transactionHash: string;
  owner?: Account;
  contract?: Contract;
};
