export type Account = {
  id: string;
};

export type Contract = {
  id: string;
  cost: number;
  maxMint: number;
  name: string;
  paused: boolean;
  phase: number;
  symbol: string;
  maxSupply: number;
  maxReserved: number;
  totalSupply: number;
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
