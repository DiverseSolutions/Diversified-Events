// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "../enums/EventStatus.sol";

import "../structs/EventDetails.sol";
import "../structs/EventNftDetails.sol";
import "../structs/OrganizerDetail.sol";

import "../nfts/ReferrableNFT.sol";

contract Event {
    event EventStatusChanged(EventStatus indexed eventStatus);
    event NftMinted(address indexed user);

    ReferrableNft public nft;
    uint256 public eventId;
    address public organizer;
    EventDetails public eventDetails;
    EventNftDetails public eventNftDetails;
    EventStatus public eventStatus;

    constructor(
        address _organizer,
        uint256 _eventId,
        EventDetails memory _eventDetails,
        EventNftDetails memory _eventNormalNftDetails
    ) {
        eventId = _eventId;
        organizer = _organizer;
        eventDetails = _eventDetails;
        eventNftDetails = _eventNormalNftDetails;

        nft = new ReferrableNft(address(this));
    }

    function mint() external payable {
        require(eventNftDetails.price == msg.value, "PRICE WRONG");
        require(nft.balanceOf(msg.sender) == 0, "YOU ALREADY HAVE EVENT NFT");
        require(eventNftDetails.limit >= nft.totalSupply(), "LIMIT REACHED");

        nft.mint(msg.sender);
        emit NftMinted(msg.sender);
    }

    function withdraw() onlyEventOwner external {
      require(eventStatus == EventStatus.Ended || eventStatus == EventStatus.Canceled,"EVENT HASN'T FINISHED");
      (bool success, ) = payable(organizer).call{value: address(this).balance}("");
      require(success,"WITHDRAW FAILED");
    }

    function getBalance() external view returns(uint) {
      return address(this).balance;
    }

    function cancelEvent() public onlyEventOwner {
        eventStatus = EventStatus.Canceled;
        emit EventStatusChanged(EventStatus.Canceled);
    }

    modifier onlyEventOwner() {
        require(organizer == msg.sender, "NOT OWNER");
        _;
    }
}
