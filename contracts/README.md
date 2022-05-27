# ERC721A Collection

This repository serves as a starter for `ERC721` collections. You can build, test and deploy your smart contract to all networks and configure them as you wish. The repository is intended to be cloned or forked and then customized according to your preferences by adjusting `./config/CollectionConfig.ts` and executing `yarn rename-contract NEW_CONTRACT_NAME NEW_SYMBOL` and `yarn configure-contract`. From there, it is of course possible to modify, remove or add tests, to modify the contract or to use a different contract from `./contracts/variants`.

> Please keep in mind that this repository was made for the current contract in `./contracts/MagicMondrian.sol`. If you modify it or use a different contract from `./contracts/variants`, tests and script may not work anymore.

## Main features

- extremely high gas efficiency due to using the ERC721A standard (More information here: https://www.azuki.com/erc721a)
- various whitelist support solutions including vouchers (signatures) as the default option and merkle trees as the second option
- automated contract verification through block explorers (e.g. Etherscan)
- simple CLI commands that guide you through all the sale steps (whitelist, public sale, reveal)
- built as a Hardhat project with TypeScript support for a better development experience
- full support for contract interaction through block explorers (e.g. Etherscan), for all the users that do not trust custom DAPPs (including the `whitelistMint(...)` function)

## Scripts

- `yarn rename-contract NEW_CONTRACT_NAME NEW_SYMBOL`: Automatically renames all relevant code occurences related to the contract name and symbol.
- `yarn configure-contract`: Configures the contract according to your configuration (i.e. max supply etc.).
- `yarn hh-node`: Starts a local blockchain.
- `yarn compile`: Compiles the contract.
- `yarn test`: Executes all tests.
- `yarn test-coverage`: Generates a code coverage report to see if all tests are covered.
- `yarn test-and-coverage`: Executes all tests and generates a code coverage report to see if all tests are covered.
- `yarn deploy-testnet`: Deploys the contract to the specified testnet.
- `yarn deploy-mainnet`: Deploys the contract to the specified mainnet.
- `yarn deploy-local`: Deploys the contract to the local blockchain.
- `yarn verify-testnet`: Verifies the contract on etherscans for the specified testnet.
- `yarn verify-mainnet`: Verifies the contract on etherscans for the specified mainnet.
- `yarn whitelist-open --network NETWORK`: Starts the whitelisting sale.
- `yarn publicsale-open --network NETWORK`: Starts the public sale.
- `yarn pause --network NETWORK`: Pauses all trading possibilities.
- `yarn unpause --network NETWORK`: Unpauses all trading possibilities.
- `yarn reveal --network NETWORK`: Reveals the collection.

## Requirements

### Software

- [Visual Studio Code](https://code.visualstudio.com/) (with the [Solidity](https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity) extension)
- [NodeJs](https://nodejs.org/) (with the [Yarn package manager](https://yarnpkg.com/getting-started/install))

### Services

- Etherscan free API key _(optional: used for the automated contract verificiation, as well as retrieving the current values for gas cost estimation)_
- Infura free basic plan or higher _(optional: used by the CLI commands in order to perform operations on real blockchains, you can skip this if you deploy and manage your contract manually)_
- Alchemy free basic plan or higher _(optional: used by the CLI commands in order to perform operations on real blockchains, you can skip this if you deploy and manage your contract manually)_
- Coin Market Cap free API key _(optional: used for retrieving the current token price for gas cost estimation in USD)_
