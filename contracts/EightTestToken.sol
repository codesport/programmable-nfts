// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/draft-ERC721Votes.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract EightTestToken is ERC721, ERC721Enumerable, ERC721URIStorage, Pausable, Ownable, ERC721Burnable, EIP712, ERC721Votes {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    //updatable state (global) variables 
    uint256 public salesPrice;
    // uint256 public balance;
    uint256 public maxSupply;  
     string  public contractMetadata;// Experimental: openSea contract-level metadata  

    constructor( string memory _contractMetadata ) ERC721("Eight Test Token", "8TEST") EIP712("Eight Test Token", "1") {

       salesPrice = 10**16; // or use: 0.01 ether;
       maxSupply = 5;
       contractMetadata = _contractMetadata;

   }


    //custom fuctions
    // function getMaxSupply() public view returns(uint256){
    //     return maxSupply;
    // }

    // function getBalance() public view returns(uint256){
    //     return balance;
    // } 

    // function getSalesPrice() public view returns(uint256){
    //     return salesPrice;
    // } 

    //custom fuctions

    /*
    *  return a URL (or base64?) for OpenSea contract-level storefront-level metadata. Apparently, only read by opensea after first mint.
    * https://docs.opensea.io/docs/contract-level-metadata  
    *  
    */  
    function contractURI() public view returns (string memory) {
        return contractMetadata;
    }

    function getTokenCurrentTokenID() public view returns(uint256){
        uint256 tokenId = _tokenIdCounter.current();
        return tokenId;
    }    

    function getTotalSupply() public view returns (uint256) { //from MOCK template
        return _getTotalSupply();
    }

    function setTotalSupply(uint256 _maxSupply) public onlyOwner{
        maxSupply = _maxSupply;
    }

    function setSalesPrice(uint256 _salesPrice) public onlyOwner{
        salesPrice = _salesPrice;
    }

    //TODO: delete in production: for unit testing only
    function deleteContract(address payable _admin) public onlyOwner{ 
        selfdestruct(_admin); 
    } 
    /* 
    * @dev reference docs:
    *
    * https://solidity-by-example.org/sending-ether/
    * https://medium.com/daox/three-methods-to-transfer-funds-in-ethereum-by-means-of-solidity-5719944ed6e9
    */
    function withdraw(uint256 amount, address payable destAddress) public onlyOwner{
        require(amount <= address(this).balance, "Can't withdraw more than current balance");
        destAddress.transfer(amount);
        // balance -= amount;
    }  

    receive() payable external {//turns on ability manually send to contract's address via metamask

        // string memory lowPaymentError = string(abi.encodePacked("Please pay sales price ", " ",  salesPrice/10**18) ); 
        // require(msg.value >= salesPrice, lowPaymentError);
        // safeMint(msg.sender, "http://website.com");
        // balance += msg.value; // keep track of balance (in WEI) 

    }

     function receiveDonations() payable public {
        // balance += msg.value; // keep track of balance (in WEI)
    } 


    //  function receivePayThenMint(address to, string memory _tokenURI) payable public {
    //     //TODO:  Refactor below into function. Source https://ethereum.stackexchange.com/a/56337
    //     string memory lowPaymentError = string(abi.encodePacked("Please pay sales price ", " ",  salesPrice/10**18) );     
    //     require(msg.value == salesPrice, lowPaymentError);
    //     safeMint(to, _tokenURI);
    //     balance += msg.value; // keep track of balance (in WEI)
    // }   


     function receivePayThenMint(address to, string memory _tokenURI) payable public {    
        require(msg.value == salesPrice, "Please pay the correct sales price");
        safeMint(to, _tokenURI);
        // balance += msg.value; // keep track of balance (in WEI)
    }  


    function safeMint(address to,  string memory uri) private {
        //uint256 totalSupply = totalSupply(); https://ethereum.stackexchange.com/q/117693
        //TODO: Why does totalSupply() double on every mint? totalSupply(); does not give what's expected. This was observed when testing in remix.

        require( _tokenIdCounter.current() < maxSupply, "Max supply of NFTs exhausted"); //custom hack see comment obove
        
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);  //TODO is tokenId zero-indexed?
        _setTokenURI(tokenId, uri);
    }




    //End custom fuctions



    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    // function safeMint(address to, string memory uri) public onlyOwner {
    //     uint256 tokenId = _tokenIdCounter.current();
    //     _tokenIdCounter.increment();
    //     _safeMint(to, tokenId);
    //     _setTokenURI(tokenId, uri);
    // }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    // The following functions are overrides required by Solidity.

    function _afterTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Votes)
    {
        super._afterTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
