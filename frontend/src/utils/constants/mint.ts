type Step = {
  name: string;
  description: string;
};

type MintSteps = {
  whitelistsale: Array<Step>;
  publicsale: Array<Step>;
};

export const MINT_TASKS: MintSteps = {
  whitelistsale: [
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
  publicsale: [
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
