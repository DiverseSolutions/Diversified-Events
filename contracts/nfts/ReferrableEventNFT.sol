// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract ReferrableEventNFT is ERC721, AccessControl {
    
    using Counters for Counters.Counter;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    Counters.Counter private _tokenIdCounter;
    

    constructor(address _eventFactory)
        ERC721("ReferrableEventNFT", "REF-EVENT")
    {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);

        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, _eventFactory);
    }


    function eventMint(
        uint tokenId,
        address to
    ) external onlyRole(MINTER_ROLE) returns (uint256) {
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        
        return tokenId;
    }

    // Modifiers

    modifier onlyEventOwner(uint256 eventId, address _owner) {
        require(ownerOf(eventId) == _owner, "NOT EVENT OWNER");
        _;
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
