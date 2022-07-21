export const CONTRACT_ADDRESS =
  process.env.VUE_APP_CONTRACT_ADDRESS ||
  "0xe73ad02d526971C25D846b2afa256EE96d8065b4";

// whitelabel apis
export const API =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://api.whitelabel-market.com";
export const UNLEASH_URL = "https://unleash.whitelabel-market.com/proxy";
export const UNLEASH_CLIENT_KEY = "proxy-client-key";

// subgraphs
export const MAMO_SUBGRAPH =
  "https://api.thegraph.com/subgraphs/name/amrap030/mamo-drop";
export const ENS_SUBGRAPH =
  "https://api.thegraph.com/subgraphs/name/ensdomains/ens";
export const UNISWAP_SUBGRAPH =
  "https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-subgraph";
export const UNISWAP_SUBGRAPH_POLYGON =
  "https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-polygon";

export const NETWORK_NAME = "maticmum";
export const CHAIN_ID = NETWORK_NAME === "maticmum" ? 80001 : 3;

// base urls
export const ENS_BASE_URL = "https://app.ens.domains/address/";
export const EXPLORER_BASE_URL =
  NETWORK_NAME === "maticmum"
    ? "https://mumbai.polygonscan.com/"
    : "https://ropsten.etherscan.io/";
export const IPFS_BASE_URL = "https://cloudflare-ipfs.com/ipfs/";
export const OPENSEA_BASE_URL = `https://testnets.opensea.io/assets/mumbai/${CONTRACT_ADDRESS}`;

export const INFURA_ID = process.env.VUE_APP_INFURA_ID || "";
