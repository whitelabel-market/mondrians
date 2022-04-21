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
      description: "Authenticate with address for Whitelist Sale",
    },
    {
      name: "Voucher",
      description: "Check if address is eligible for Whitelist Sale",
    },
    {
      name: "Mint",
      description: "Create your Magic Mondrian tokens",
    },
    {
      name: "Load",
      description: "Load your tokens",
    },
  ],
  PublicSale: [
    {
      name: "Mint",
      description: "Create your Magic Mondrian tokens",
    },
    {
      name: "Load",
      description: "Load your tokens",
    },
  ],
};
