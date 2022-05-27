import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import { expect } from "chai";
import { MagicMondrian } from "../typechain";
import { signWhitelist } from "../utils/voucher";
import { INTERFACES } from "../utils/constants";
import CollectionConfig from "../config/CollectionConfig";
const { makeInterfaceId } = require("@openzeppelin/test-helpers");

context("Contract: MagicMondrian", async function () {
  let contract: MagicMondrian;
  let owner: SignerWithAddress;
  let whitelistKey: SignerWithAddress;
  let maliciousKey: SignerWithAddress;
  let mockSignature =
    "0xd35e4ae6b19c9933932d986afec75dba83e98d9c5f549c39d72a8bc5ed56eea4261854aeeba0dcee31287bd5e65ca5a37a86490251f1a7b4137b584d39235b901c";

  before(async function () {
    [owner, whitelistKey, maliciousKey] = await ethers.getSigners();

    const Contract = await ethers.getContractFactory(
      CollectionConfig.contractName
    );

    contract = (await Contract.deploy(
      [owner.address, whitelistKey.address],
      [50, 50],
      owner.address,
      CollectionConfig.hiddenMetadataUri
    )) as MagicMondrian;
    await contract.deployed();
  });

  describe("Deployment", async () => {
    it("Should return correct name", async () => {
      expect(await contract.name()).to.equal(CollectionConfig.tokenName);
    });

    it("Should return correct symbol", async () => {
      expect(await contract.symbol()).to.equal(CollectionConfig.tokenSymbol);
    });

    it("Should not be paused", async () => {
      expect(await contract.paused()).to.equal(false);
    });

    it("Should have 0 total supply", async () => {
      expect(await contract.totalSupply()).to.equal(0);
    });

    it("Should have 100 % total shares", async () => {
      expect(await contract.totalShares()).to.equal(100);
    });

    it("Should support all interfaces", async function () {
      for (const k of ["ERC165", "ERC721", "ERC721Metadata"]) {
        const interfaceId = makeInterfaceId.ERC165(INTERFACES[k]);
        expect(await contract.supportsInterface(interfaceId)).to.equal(true);
      }
    });
  });
  describe("Minting", async () => {
    it("Should fail because whitelist not active", async () => {
      const { chainId } = await ethers.provider.getNetwork();
      const signature = await signWhitelist(
        chainId,
        contract.address,
        owner,
        whitelistKey.address,
        CollectionConfig.tokenName,
        "1"
      );

      const price = await contract.cost();
      const amount =
        CollectionConfig.whitelistSale.maxMintAmountPerTx === 1
          ? CollectionConfig.whitelistSale.maxMintAmountPerTx
          : CollectionConfig.whitelistSale.maxMintAmountPerTx - 1;

      await expect(
        contract
          .connect(whitelistKey)
          .whitelistMint(whitelistKey.address, amount, signature, {
            value: ethers.utils
              .parseEther(ethers.utils.formatEther(price.toString()))
              .mul(amount),
          })
      ).to.be.revertedWith("Whitelist Sale not active");
    });

    it("Should fail because not whitelisted", async () => {
      await contract.setPhase(1);
      const price = await contract.cost();
      const amount = CollectionConfig.whitelistSale.maxMintAmountPerTx + 1;

      await expect(
        contract
          .connect(whitelistKey)
          .whitelistMint(whitelistKey.address, amount, mockSignature, {
            value: ethers.utils
              .parseEther(ethers.utils.formatEther(price.toString()))
              .mul(amount),
          })
      ).to.be.revertedWith("Not whitelisted");
    });

    it("Should fail because max mint amount exceeded", async () => {
      const price = await contract.cost();
      const { chainId } = await ethers.provider.getNetwork();
      const signature = await signWhitelist(
        chainId,
        contract.address,
        owner,
        whitelistKey.address,
        CollectionConfig.tokenName,
        "1"
      );
      const amount = CollectionConfig.whitelistSale.maxMintAmountPerTx + 1;

      await expect(
        contract
          .connect(whitelistKey)
          .whitelistMint(whitelistKey.address, amount, signature, {
            value: ethers.utils
              .parseEther(ethers.utils.formatEther(price.toString()))
              .mul(amount),
          })
      ).to.be.revertedWith("Max mint amount exceeded");
    });

    it("Should allow minting if a valid signature is sent", async function () {
      const { chainId } = await ethers.provider.getNetwork();
      const signature = await signWhitelist(
        chainId,
        contract.address,
        owner,
        whitelistKey.address,
        CollectionConfig.tokenName,
        "1"
      );
      const price = await contract.cost();
      const amount =
        CollectionConfig.whitelistSale.maxMintAmountPerTx === 1
          ? CollectionConfig.whitelistSale.maxMintAmountPerTx
          : CollectionConfig.whitelistSale.maxMintAmountPerTx - 1;

      expect(
        await contract
          .connect(whitelistKey)
          .whitelistMint(whitelistKey.address, amount, signature, {
            value: ethers.utils
              .parseEther(ethers.utils.formatEther(price.toString()))
              .mul(amount),
          })
      )
        .to.emit(contract, "Transfer")
        .withArgs(ethers.constants.AddressZero, whitelistKey.address, amount);
    });

    it("Should return hidden uri", async () => {
      await expect(contract.tokenURI(0)).to.be.revertedWith(
        "URI query for nonexistent token"
      );
      expect(await contract.tokenURI(1)).to.equal(
        CollectionConfig.hiddenMetadataUri
      );
    });

    it("Should fail because max supply for one address during whitelist sale exceeded", async () => {
      const { chainId } = await ethers.provider.getNetwork();
      const signature = await signWhitelist(
        chainId,
        contract.address,
        owner,
        whitelistKey.address,
        CollectionConfig.tokenName,
        "1"
      );
      const price = await contract.cost();
      const amount = CollectionConfig.whitelistSale.maxMintAmountPerTx + 1;
      await expect(
        contract
          .connect(whitelistKey)
          .whitelistMint(whitelistKey.address, amount, signature, {
            value: ethers.utils
              .parseEther(ethers.utils.formatEther(price.toString()))
              .mul(amount),
          })
      ).to.be.revertedWith("Max mint amount exceeded");
    });

    it("Should not allow minting if a different signature is sent", async function () {
      const { chainId } = await ethers.provider.getNetwork();
      const signature = await signWhitelist(
        chainId,
        contract.address,
        owner,
        whitelistKey.address,
        CollectionConfig.tokenName,
        "1"
      );
      const price = await contract.cost();
      const amount = CollectionConfig.whitelistSale.maxMintAmountPerTx - 1;
      await expect(
        contract
          .connect(maliciousKey)
          .whitelistMint(maliciousKey.address, amount, signature, {
            value: ethers.utils
              .parseEther(ethers.utils.formatEther(price.toString()))
              .mul(amount),
          })
      ).to.be.revertedWith("Not whitelisted");
    });

    it("Should mint token during public sale", async () => {
      await contract.setPhase(2);
      await contract.setMaxMintAmountPerTx(
        CollectionConfig.publicSale.maxMintAmountPerTx
      );
      await contract.setCost(
        ethers.utils.parseEther(CollectionConfig.publicSale.price.toString())
      );

      const price = await contract.cost();
      const amount = CollectionConfig.publicSale.maxMintAmountPerTx - 1;

      expect(
        await contract
          .connect(whitelistKey)
          .publicSaleMint(whitelistKey.address, amount, {
            value: ethers.utils
              .parseEther(ethers.utils.formatEther(price.toString()))
              .mul(amount),
          })
      )
        .to.emit(contract, "Transfer")
        .withArgs(ethers.constants.AddressZero, whitelistKey.address, amount);
    });

    it("Should airdrop token to account", async () => {
      const amount = 1;
      expect(await contract.airDrop(whitelistKey.address, amount))
        .to.emit(contract, "Transfer")
        .withArgs(ethers.constants.AddressZero, whitelistKey.address, amount);
    });
  });
});
