import CollectionConfigInterface from "../utils/types/CollectionConfigInterface";
import { ethereumTestnet, ethereumMainnet } from "../utils/constants";
import whitelistAddresses from "./whitelist.json";

const CollectionConfig: CollectionConfigInterface = {
  testnet: ethereumTestnet,
  mainnet: ethereumMainnet,
  // The contract name can be updated using the following command:
  // yarn rename-contract NEW_CONTRACT_NAME NEW_SYMBOL
  // Please DO NOT change it manually!
  contractName: "MagicMondrian",
  tokenName: "Magic Mondrian",
  tokenSymbol: "MAMO",
  // from here it can be updated manually in this file, then run yarn configure-contract
  hiddenMetadataUri:
    "ipfs://QmdGEiSCeTtaeunKAzejmAS3MbmR5FhVUkeAmWbY55La47/hidden.json",
  revealedUri:
    "ipfs://bafybeibpirhnkwr2ftex5req2fgmaevnw2dfp7gpcxjtbaf6x3hbhkt7hy/",
  maxSupply: 1000,
  maxReserved: 50,
  whitelistSale: {
    price: 0.00025,
    maxMintAmountPerTx: 5,
  },
  publicSale: {
    price: 0.0005,
    maxMintAmountPerTx: 10,
  },
  payeesAdresses: [
    "0xe3bbf29f034fA780407Fd11dac7A0B3938b1bc6a",
    "0xfb98848b723e05d7F60cc2dC8d5157a6A01325Dc",
  ],
  payeesShares: [50, 50],
  contractAddress: "0x0a43025d1Fd82E8818f6c6036E093B160EeDd9E3",
  signerAddress: "0x24dC17EeC2b5A7a4e89013C15649145e337033b2",
  whitelistAddresses,
};

export default CollectionConfig;
