// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "../structs/EventDetails.sol";
import "../structs/EventNormalNftDetails.sol";
import "../structs/EventReferrableNftDetails.sol";
import "../structs/OrganizerDetail.sol";

contract ReferrableEventNFT is ERC721, AccessControl {
    
    using Counters for Counters.Counter;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    Counters.Counter private _tokenIdCounter;
    
    EventDetails[] public eventDetails;
    EventNormalNftDetails[] public eventNormalNftDetails;
    EventReferrableNftDetails[] public eventReferrableNftDetails;

    constructor(address _eventFactory)
        ERC721("ReferrableEventNFT", "REF-EVENT")
    {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);

        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, _eventFactory);
    }


    function eventMint(
        address to,
        EventDetails calldata _eventDetails,
        EventNormalNftDetails calldata _eventNormalNftDetails,
        EventReferrableNftDetails calldata _eventReferrableNftDetails
    ) external onlyRole(MINTER_ROLE) returns (uint256) {

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);

        eventDetails.push(_eventDetails);
        eventNormalNftDetails.push(_eventNormalNftDetails);
        eventReferrableNftDetails.push(_eventReferrableNftDetails);

        return tokenId;
    }

    // State Changing Functions

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}

    // function cancelEvent(uint256 eventId) external payable {

    // }
    
    // function getUsersLength(uint256 eventId) external view returns(uint) {

    // }

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
