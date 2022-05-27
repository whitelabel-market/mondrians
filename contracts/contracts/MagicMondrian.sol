// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

// @author Whitelabel Solutions
// @title Magic Mondrian (MAMO)

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./cryptography/EIP712.sol";
import "./ERC721A.sol";

contract MagicMondrian is Ownable, Pausable, ReentrancyGuard, ERC721A, EIP712 {
    using Strings for uint256;
    using SafeMath for uint256;

    // Options for selling phases
    enum Phase {
        PreSale,
        WhitelistSale,
        PublicSale,
        Reveal
    }

    event SetBaseURI (string baseURI);

    // Token base URI
    string private baseURI;
    // Hidden URI
    string private hiddenURI;

    // Payment splitter address
    address payable private paymentSplitter;

    // Current selling phase
    Phase public sellingPhase;

    // Max amount of available NFT's
    uint256 public constant MAX_SUPPLY = 1000;
    // Reserved NFT's for Owner (airdrop, etc.)
    uint256 public maxReserved = 50;
    // Max mint amount per transaction
    uint256 public maxMint = 5;
    // Initial price for whitelist sale
    uint256 public cost = 0.00025 ether;

    // Mapping to limit amount of NFT's per address during whitelist sale
    mapping(address => uint) public amountNFTsperWalletWhitelistSale;

    constructor(address _paymentSplitter, address _signerAddress, string memory _hiddenURI) ERC721A("Magic Mondrian", "MAMO") EIP712(_signerAddress, "Magic Mondrian") {
        hiddenURI = _hiddenURI;
        paymentSplitter = payable(_paymentSplitter);
    }

    modifier callerIsUser() {
        require(tx.origin == msg.sender, "The caller is another contract"); // solhint-disable-line avoid-tx-origin
        _;
    }

    // Minting

    /**
     * @dev Mints the specified amount of tokens during whitelist sale to the specified account, if all requirements are fulfilled.
     *
     * @param _account address new owner of the token
     * @param _quantity uint256 amount of tokens to be minted
     * @param _signature bytes signature proof to check if sender is whitelisted
     */
    function whitelistMint(address _account, uint256 _quantity, bytes calldata _signature) external payable callerIsUser requiresWhitelist(_signature) {
        uint256 price = cost;
        require(price != 0, "Price is 0");
        require(sellingPhase == Phase.WhitelistSale, "Whitelist Sale not active");
        require(amountNFTsperWalletWhitelistSale[msg.sender] + _quantity < maxMint + 1, "Max mint amount exceeded");
        require(totalSupply() + _quantity < MAX_SUPPLY - maxReserved + 1, "Max supply exceeded");
        require(msg.value >= price.mul(_quantity), "Not enough funds");
        _safeMint(_account, _quantity);
        amountNFTsperWalletWhitelistSale[msg.sender] += _quantity;
    }

    /**
     * @dev Mints the specified amount of tokens during public sale to the specified account, if all requirements are fulfilled.
     *
     * @param _account address new owner of the token
     * @param _quantity uint256 amount of tokens to be minted
     */
    function publicSaleMint(address _account, uint256 _quantity) external payable callerIsUser {
        uint256 price = cost;
        require(price != 0, "Price is 0");
        require(sellingPhase > Phase.WhitelistSale, "Public Sale not active");
        require(_quantity < maxMint + 1, "Max mint amount exceeded");
        require(totalSupply() + _quantity < MAX_SUPPLY - maxReserved + 1, "Max supply exceeded");
        require(msg.value >= price.mul(_quantity), "Not enough funds");
        _safeMint(_account, _quantity);
    }

    /**
     * @dev Mints the specified amount of tokens to an address, without paying the token price. Only available for the Owner.
     *
     * @param _to address new owner of the token
     * @param _quantity uint256 amount of tokens to be minted
     */
    function airDrop(address _to, uint256 _quantity) external onlyOwner {
        require(totalSupply() + _quantity < MAX_SUPPLY + 1, "Reached max Supply");
        _safeMint(_to, _quantity);
    }

    // Utils

    /**
     * @dev Set a new phase.
     *
     * @param _phase uint256 new phase number
     */
    function setPhase(uint256 _phase) external onlyOwner {
        sellingPhase = Phase(_phase);
    }

    /**
     * @dev Possibility to set a new costs.
     *
     * @param _cost uint256 new costs
     */
    function setCost(uint256 _cost) external onlyOwner {
        cost = _cost;
    }

    /**
     * @dev Set new maximum mint amount per transaction.
     *
     * @param _maxMintAmountPerTx uint256 new max mint amount
     */
    function setMaxMintAmountPerTx(uint256 _maxMintAmountPerTx) external onlyOwner {
        maxMint = _maxMintAmountPerTx;
    }

    /**
     * @dev Set new max reserved amount.
     *
     * @param _maxReserved uint256 new max reserved amount
     */
    function setMaxReserved(uint256 _maxReserved) external onlyOwner {
        maxReserved = _maxReserved;
    }

    /**
     * @dev Set new hidden metadata uri.
     *
     * @param _hiddenUri string new hidden metadata uri
     */
    function setHiddenUri(string memory _hiddenUri) external onlyOwner {
        hiddenURI = _hiddenUri;
    }

    /**
     * @dev Possibility to set a new token base uri after deployment.
     *
     * @param _baseURI string new token base uri
     */
    function setBaseUri(string memory _baseURI) external onlyOwner {
        baseURI = _baseURI;
        emit SetBaseURI(baseURI);
    }

    // Internals

    /**
     * @dev Override the ERC721A _startTokenId() function, so that the first token starts with id 1.
     *
     * @return 1
     */
    function _startTokenId() internal pure virtual override returns (uint256) {
        return 1;
    }

    // URI getters

    /**
     * @dev Get the token uri for 1 token by id.
     *
     * @param _tokenId uint256 id of the token
     * @return string concatenated token uri for 1 token
     */
    function tokenURI(uint256 _tokenId) public view virtual override returns (string memory) {
        require(_exists(_tokenId), "URI query for nonexistent token");

        if (sellingPhase < Phase.Reveal) {
            return hiddenURI;
        }
        return bytes(baseURI).length > 0
            ? string(abi.encodePacked(baseURI, _tokenId.toString(), ".json"))
            : "";
    }

    /**
     * @dev Get the contract uri to get metadata about the contract for OpenSea.
     *
     * @return string contract uri includes contract metadata
     */
    function contractURI() external pure returns (string memory) {
        return "ipfs://QmbvT9L47MVum7icnoCb7sPPY17mwBQxzYiGHQbhyJvPH6/";
    }

    // Pausable

    /**
     * @dev Pauses any transfers for serially-ordered token ids. This includes minting.
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @dev Unpauses any transfers for serially-ordered token ids. This includes minting.
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @dev Hook that is called before a set of serially-ordered token ids are about to be transferred. This includes minting.
     * Function is overriden, because it uses the whenNotPaused modifier from the Pausable contract
     *
     * @param from address representing the previous owner of the given token ID
     * @param to target address that will receive the tokens
     * @param startTokenId uint256 the first token id to be transferred
     * @param quantity uint256 the amount to be transferred
     */
    function _beforeTokenTransfers(address from, address to, uint256 startTokenId, uint256 quantity) internal whenNotPaused override {
        super._beforeTokenTransfers(from, to, startTokenId, quantity);
    }

    function withdraw() external payable nonReentrant {
        (bool success, ) = payable(paymentSplitter).call{ value: address(this).balance }(""); // solhint-disable-line avoid-low-level-calls
        require(success, "Withdraw failed");
    }

    receive() external payable {
        revert("Only if you mint");
    }
}