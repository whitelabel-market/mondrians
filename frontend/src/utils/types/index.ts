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

export type EnsDomain = {
  name: string;
  labelName: string;
  labelhash: string;
  createdAt: string;
};

export type EnsAccount = {
  id: string;
  domains: EnsDomain[];
};

export const ENS_ACCOUNT = Symbol();

export const USER = Symbol();
