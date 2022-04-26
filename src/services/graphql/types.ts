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

export const getTokenHourData = `
  query tokenHourDatas($startTime: Int!, $skip: Int! = 0, $address: Bytes! = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2") {
    tokenHourDatas(first: 100, skip: $skip, where: {token: $address, periodStartUnix_gt: $startTime}, orderBy: periodStartUnix, orderDirection: asc) {
      periodStartUnix,
      high,
      low,
      open,
      close
    }
  }
`;

export const getEthToUsdForBlock = `
  query GetEthToUsdForBlock($block: Int = 0) {
    bundles(block: {number: $block}) {
      ethPrice
    }
  }
`;

export const getBlock = `
  query GetBlock($timestamp: Int = 0) {
    blocks(first: 1, where: {timestamp_gte: $timestamp}) {
      number
    }
  }
`;

export const getActivity = `
  query GetActivity($address: String = "") {
    account(id: $address) {
      transfersFrom {
        id
        from {
          id
        }
        to {
          id
        }
        token{
          id
        }
        transactionHash
        createdAtBlockNumber
        createdAtTimestamp
        gasPrice
        value
      }
      transfersTo {
        id
        token{
          id
        }
        from {
          id
        }
        to {
          id
        }
        transactionHash
        createdAtBlockNumber
        createdAtTimestamp
        gasPrice
        value
      }
    }
  }
`;
