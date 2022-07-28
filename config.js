module.exports = {
  hostUrl:
    process.env.NODE_ENV === "development"
      ? "https://magic-mondrian.netlify.app/"
      : "https://www.magic-mondrian.art",
  supportEmail:
    process.env.NODE_ENV === "development"
      ? "kevin.hertwig@t-online.de"
      : "support@magic-mondrian.art",
  tokenImageForMetamaskWallet:
    "https://ipfs.io/ipfs/bafybeid7fmhgs7roxyctc5k2ciut3wgznpnhtx2tawhl2pf47s7e554cim/1.png",
  tokenSymbol: "MAMO",
  ensBaseUrl: "https://app.ens.domains/address/",
  explorerBaseUrl: "https://mumbai.polygonscan.com/",
  ipfsBaseUrl: "https://cloudflare-ipfs.com/ipfs/",
  openseaBaseUrl: "https://testnets.opensea.io/assets/mumbai/",
  chainId: 80001,
  networkName: "maticmum",
  contract: "0x016568903eD64336aFba91f528A6d7f97DD36e4f",
  subgraph: {
    mamo: "https://api.thegraph.com/subgraphs/name/amrap030/mamo-drop",
    ens: "https://api.thegraph.com/subgraphs/name/ensdomains/ens",
    uniswap:
      "https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-subgraph",
    uniswapPolygon:
      "https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-polygon",
  },
  infura: {
    id: process.env.VUE_APP_INFURA_ID || "3f6ed0b245824ed7ba603a0d01e52a4b",
  },
  unleash: {
    clientKey: "proxy-client-key",
    url: "https://unleash.whitelabel-market.com/proxy",
  },
  prodigi: {
    apiKey: process.env.PRODIGI_KEY || "",
    callbackUrl:
      process.env.NODE_ENV === "development"
        ? "https://f51f-158-181-76-197.ngrok.io/api/print/update"
        : "https://api.whitelabel-market.com/api/print/update",
    assetBaseUrl:
      process.env.NODE_ENV === "development"
        ? "https://f51f-158-181-76-197.ngrok.io/screenshots/"
        : "https://api.whitelabel-market.com/screenshots/",
    apiBaseUrl:
      process.env.NODE_ENV === "development"
        ? "https://api.sandbox.prodigi.com/v4.0"
        : "https://api.prodigi.com/v4.0",
  },
  email: {
    address: "kevin.hertwig@t-online.de",
    password: process.env.EMAIL_PW || "",
    host: "securesmtp.t-online.de",
    port: 465,
  },
  appleWallet: {
    wwdrCert: process.env.WWDR_CERT || "",
    signerCert: process.env.SIGNER_CERT || "",
    signerKey: process.env.SIGNER_KEY || "",
    passPhrase: "_mam0drOp2022_",
  },
  backend: {
    port: process.env.NODE_ENV === "development" ? "3000" : "8080",
    logLevel: process.env.NODE_ENV === "development" ? "info" : "error",
    apiKey: process.env.PRINT_KEY || "",
    url:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://api.whitelabel-market.com",
  },
  redis: {
    host: process.env.NODE_ENV === "development" ? "localhost" : "redis",
    port: 6379,
  },
  whitelisting: {
    domain: "Magic Mondrian",
    version: "1",
    signerPkey: process.env.SIGNER_PKEY || "",
    signerAddress: "",
    ghPat: process.env.GH_PAT || "", // Github PAT (Personal Access Token)
  },
  mint: {
    whitelistAmount: 100,
    whitelistPrice: "0.00025",
    publicAmount: 100,
    publicPrice: "0.00025",
    printPrice: "0.0001",
  },
  // get chainlist data from https://chainlist.org/_next/data/vGwPZ2PwoEZ6GXCGx7Sse/en/chain/<chainId>.json
  chainList: {
    name: "Mumbai",
    title: "Polygon Testnet Mumbai",
    chain: "Polygon",
    rpc: [
      "https://matic-mumbai.chainstacklabs.com",
      "https://rpc-mumbai.maticvigil.com",
      "https://matic-testnet-archive-rpc.bwarelabs.com",
      "https://rpc.ankr.com/polygon_mumbai",
      "https://polygontestapi.terminet.io/rpc",
    ],
    faucets: ["https://faucet.polygon.technology/"],
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    infoURL: "https://polygon.technology/",
    shortName: "maticmum",
    chainId: 80001,
    networkId: 80001,
    explorers: [
      {
        name: "polygonscan",
        url: "https://mumbai.polygonscan.com",
        standard: "EIP3091",
      },
    ],
  },
};
