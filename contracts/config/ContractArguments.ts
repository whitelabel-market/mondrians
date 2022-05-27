import CollectionConfig from "./CollectionConfig";

// Update the following array if you change the constructor arguments...
const ContractArguments = [
  CollectionConfig.payeesAdresses,
  CollectionConfig.payeesShares,
  CollectionConfig.signerAddress,
  CollectionConfig.hiddenMetadataUri,
] as const;

export default ContractArguments;
