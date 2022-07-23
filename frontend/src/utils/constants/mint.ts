import CONFIG from "../../../../config";

export const Price = {
  whitelist: CONFIG.mint.whitelistPrice,
  default: CONFIG.mint.publicPrice,
};

export const MaxMint = {
  whitelist: CONFIG.mint.whitelistAmount,
  default: CONFIG.mint.publicAmount,
};

export enum SalePhase {
  PreSale = "presale",
  WhitelistSale = "whitelistsale",
  PublicSale = "publicsale",
}

export enum MintStepKey {
  VERIFY_VOUCHER = "Verify Voucher",
  MINT = "Mint",
  LOAD_TOKEN = "Load Token",
}
