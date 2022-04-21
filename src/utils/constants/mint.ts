type Step = {
  name: string;
  description: string;
};

type MintSteps = {
  WhitelistSale: Array<Step>;
  PublicSale: Array<Step>;
};

export const MINT_TASKS: MintSteps = {
  WhitelistSale: [
    {
      name: "Authenticate",
      description: "Ensuring authenticity of your eth account address",
    },
    {
      name: "Get Voucher",
      description:
        "Check if your address is eligible for Whitelist Sale and receive voucher",
    },
    {
      name: "Mint",
      description: "Create your own Magic Mondrian NFT's",
    },
    {
      name: "Load Token",
      description: "Receiving your minted NFT's",
    },
  ],
  PublicSale: [
    {
      name: "Mint",
      description: "Create your own Magic Mondrian NFT's",
    },
    {
      name: "Load Token",
      description: "Receiving your minted NFT's",
    },
  ],
};
