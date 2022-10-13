// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract ReferrableNft is ERC721, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    uint public tokenId;

    constructor(address _event) ERC721("ReferrableNft", "RNFT") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, _event);
        tokenId = 1;
    }

    function mint(address to) external onlyRole(MINTER_ROLE){
        require(balanceOf(to) == 0,"ALREADY HAS NFT");
        _safeMint(to, tokenId);
        tokenId += 1;
    }

    function totalSupply() view external returns(uint){
      return tokenId;
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
