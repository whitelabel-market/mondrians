import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import { expect } from "chai";
import { MagicMondrian, SplitPayments } from "../typechain";
import { signWhitelist } from "../utils/voucher";
import { INTERFACES } from "../utils/constants";
import CollectionConfig from "../config/CollectionConfig";
const { makeInterfaceId } = require("@openzeppelin/test-helpers");

context("Contract: MagicMondrian", async function () {
  let contract: MagicMondrian;
  let paymentSplitter: SplitPayments;
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

    const PaymentSplitter = await ethers.getContractFactory("SplitPayments");

    paymentSplitter = (await PaymentSplitter.deploy(
      [owner.address, whitelistKey.address],
      [50, 50]
    )) as SplitPayments;

    const splitter = await paymentSplitter.deployed();

    contract = (await Contract.deploy(
      splitter.address,
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

    it("Should return correct maxSupply", async () => {
      expect(await contract.MAX_SUPPLY()).to.equal(CollectionConfig.maxSupply);
    });

    it("Should return correct maxReserved", async () => {
      expect(await contract.maxReserved()).to.equal(
        CollectionConfig.maxReserved
      );
    });

    it("Should return correct maxMint for whitelist sale", async () => {
      expect(await contract.maxMint()).to.equal(
        CollectionConfig.whitelistSale.maxMintAmountPerTx
      );
    });

    it("Should return correct price for whitelist sale", async () => {
      const price = await ethers.utils.formatEther(
        (await contract.cost()).toString()
      );
      expect(Number(price)).to.equal(CollectionConfig.whitelistSale.price);
    });

    it("Should not be paused", async () => {
      expect(await contract.paused()).to.equal(false);
    });

    it("Should have 0 total supply", async () => {
      expect(await contract.totalSupply()).to.equal(0);
    });

    it("Should have phase presale", async () => {
      expect(await contract.sellingPhase()).to.equal(0);
    });

    it("Should support all interfaces", async function () {
      for (const k of ["ERC165", "ERC721", "ERC721Metadata"]) {
        const interfaceId = makeInterfaceId.ERC165(INTERFACES[k]);
        expect(await contract.supportsInterface(interfaceId)).to.equal(true);
      }
    });

    it("Should have no minted token so far", async () => {
      await expect(contract.tokenURI(0)).to.be.revertedWith(
        "URI query for nonexistent token"
      );
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

    it("Should init whitelist sale", async () => {
      await contract.setPhase(1);
      expect(await contract.sellingPhase()).to.equal(1);
    });

    it("Should fail because not whitelisted", async () => {
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

    it("Should pause contract", async () => {
      expect(await contract.connect(owner).pause())
        .to.emit(contract, "Paused")
        .withArgs(ethers.constants.AddressZero, owner.address);

      expect(await contract.paused()).to.equal(true);
    });

    it("Should not allow minting because contract is paused", async function () {
      const { chainId } = await ethers.provider.getNetwork();
      const signature = await signWhitelist(
        chainId,
        contract.address,
        owner,
        owner.address,
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
          .connect(owner)
          .whitelistMint(owner.address, amount, signature, {
            value: ethers.utils
              .parseEther(ethers.utils.formatEther(price.toString()))
              .mul(amount),
          })
      ).to.be.revertedWith("Pausable: paused");
    });

    it("Should not allow airdrop because contract is paused", async () => {
      const amount = 1;
      await expect(
        contract.airDrop(whitelistKey.address, amount)
      ).to.be.revertedWith("Pausable: paused");
    });

    it("Should unpause contract", async () => {
      expect(await contract.connect(owner).unpause())
        .to.emit(contract, "Unpaused")
        .withArgs(ethers.constants.AddressZero, owner.address);

      expect(await contract.paused()).to.equal(false);
    });

    it("Should return hidden token uri", async () => {
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

    it("Should init public sale", async () => {
      await contract.setPhase(2);
      expect(await contract.sellingPhase()).to.equal(2);
    });

    it("Should update max mint to public sale", async () => {
      await contract.setMaxMintAmountPerTx(
        CollectionConfig.publicSale.maxMintAmountPerTx
      );
      expect(await contract.maxMint()).to.equal(
        CollectionConfig.publicSale.maxMintAmountPerTx
      );
    });

    it("Should update cost to public sale price", async () => {
      await contract.setCost(
        ethers.utils.parseEther(CollectionConfig.publicSale.price.toString())
      );

      const price = await ethers.utils.formatEther(
        (await contract.cost()).toString()
      );
      expect(Number(price)).to.equal(CollectionConfig.publicSale.price);
    });

    it("Should mint token during public sale", async () => {
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
