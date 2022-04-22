export const getContract = `
  query GetContract($id: String = "") {
    contract(id: $id) {
      cost
      id
      maxMint
      name
      paused
      phase
      symbol
      maxSupply
      maxReserved
      totalSupply
    }
  }
`;

export const getTokensFromBlock = `
  query GetTokensFromBlock($address: String = "", $block: Int = 0) {
    tokens(where: { owner: $address, createdAtBlockNumber: $block }) {
      id
      imageURI
      createdAtTimestamp
      createdAtBlockNumber
      transactionHash
    }
  }
`;
