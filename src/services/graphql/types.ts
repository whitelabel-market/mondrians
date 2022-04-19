import gql from "graphql-tag";

export const getContract = gql`
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

export const getTokensFromBlock = gql`
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
