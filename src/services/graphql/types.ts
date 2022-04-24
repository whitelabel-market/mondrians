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

export const getTokensForAccount = `
  query GetTokensForAccount($owner: String = "") {
    tokens(where: { owner: $owner }) {
      id
      owner {
        id
      }
      contract {
        id
      }
      imageURI
      createdAtTimestamp
      createdAtBlockNumber
      transactionHash
    }
  }
`;

export const getEnsAccount = `
  query GetEnsAccount($address: String = "") {
    account(id: $address) {
      id
      domains {
        name
        labelName
        labelhash
        createdAt
      }
    }
  }
`;

export const getEthToUsd = `
  query GetEthToUsd {
    bundle(id: 1) {
      ethPrice
    }
  }
`;
