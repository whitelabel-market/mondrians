import CONFIG from "../../../../config";

export const Price = {
  whitelist: CONFIG.mint.whitelistPrice,
  default: CONFIG.mint.publicPrice,
  print: CONFIG.mint.printPrice,
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

export const MintDescription = {
  event:
    "As an owner of a Magic Mondrian NFT, you have the opportunity to be part of an exclusive real life event. Register your email address and we will send you the tickets along with further information.",
  print:
    "Order a fine-art print of your Magic Mondrian NFT artwork. You can only print one item at once.",
};
