const defaultUser = "0x23479a6877970e5889dfad779e225adc08eb8e03";

export function getRoutes(user: string | number = defaultUser) {
  return {
    Home: {
      About: "/#About",
      Gallery: "/#Gallery",
      Roadmap: "/#Roadmap",
      Rarity: "/#Rarity",
      Creator: "/#Creator",
      FAQ: "/#Faq",
    },
    User: {
      "Collected Tokens": `/user/${user}/collected`,
      Activity: `/user/${user}/activity`,
      "Event Invitation": `/user/${user}/event`,
      Print: `/user/${user}/print`,
    },
    Mint: { Mint: "/mint" },
    Legal: {
      "Terms of service": "/legal/terms-of-service",
      "Return policy": "/legal/return-policy",
      "Privacy policy": "/legal/privacy-policy",
    },
  };
}
