export const Price = {
  whitelist: "0.00025",
  default: "0.005",
};

export const MaxMint = {
  whitelist: 5,
  default: 10,
};

export enum SalePhase {
  PreSale = "presale",
  WhitelistSale = "whitelistsale",
  PublicSale = "publicsale",
  Reveal = "reveal",
}

export enum MintStepKey {
  GET_VOUCHER = "Get Voucher",
  MINT = "Mint",
  LOAD_TOKEN = "Load Token",
}
