// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";

import "../structs/OrganizerDetail.sol";

contract OrganizerNFT is ERC721, AccessControl {
    using Counters for Counters.Counter;

    OrganizerDetail[] public organizerDetails;
 
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");
    Counters.Counter private _tokenIdCounter;

    constructor(address _organizerFactory) ERC721("OrganizerNFT", "ORGNZR") {
        _grantRole(DEFAULT_ADMIN_ROLE, _organizerFactory);
        _grantRole(BURNER_ROLE, _organizerFactory);
        
        _grantRole(MINTER_ROLE, _organizerFactory);
    }

    function organizerMint(
      address to,
      string memory _username,
      string memory _linkedIn,
      string memory _email
    ) external onlyRole(MINTER_ROLE) returns (uint) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);

        OrganizerDetail memory detail;
        detail.username = _username;
        detail.linkedIn = _linkedIn;
        detail.email = _email;

        organizerDetails.push(detail);

        return tokenId;
    }

    function organizerBurn (uint256 tokenId) external onlyRole(BURNER_ROLE) {
        _burn(tokenId);
    }

    function getOrganizerDetail(uint id) external view returns(OrganizerDetail memory){
      return organizerDetails[id];
    }

    // The following functions are overrides required by Solidity.

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
