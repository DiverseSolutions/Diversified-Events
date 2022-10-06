// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./nfts/NormalEventNFT.sol";
import "./nfts/ReferrableEventNFT.sol";

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./structs/EventDetails.sol";
import "./structs/EventNormalNftDetails.sol";
import "./structs/EventReferrableNftDetails.sol";
import "./structs/OrganizerDetail.sol";

import "./interfaces/IOrganizerNFT.sol";

contract EventFactory is AccessControl {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIdCounter;

  mapping(address => uint[]) public organizerAddressToOrganizerEvents;
  mapping(address => uint) public organizerAddressToOrganizerEventsLength;
  mapping(uint => address) public eventIdToOrganizerAddress;

  uint[] public events;

  EventDetails[] public eventDetails;
  EventNormalNftDetails[] public eventNormalNftDetails;
  EventReferrableNftDetails[] public eventReferrableNftDetails;

  NormalEventNFT public normalEventNft;
  ReferrableEventNFT public referrableEventNft;
  IOrganizerNFT public organizerNft;


  event eventNFTMinted (
    EventDetails eventDetails,
    EventNormalNftDetails eventNormalNftDetails,
    EventReferrableNftDetails eventReferrableNftDetails
  );

  constructor(address _organizerNft) {
    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    normalEventNft = new NormalEventNFT(address(this));
    referrableEventNft = new ReferrableEventNFT(address(this));
    organizerNft = IOrganizerNFT(_organizerNft);
  }

  function createEvent(
        EventDetails calldata _eventDetails,
        EventNormalNftDetails calldata _eventNormalNftDetails,
        EventReferrableNftDetails calldata _eventReferrableNftDetails
  ) external {
    require(organizerNft.balanceOf(msg.sender) > 0,"USER ISN'T ORGANIZER");
    uint256 _tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    if (_eventReferrableNftDetails.referrableNftAllowed){
      referrableEventNft.eventMint(
        _tokenId,
        msg.sender,
        _eventDetails,
        _eventNormalNftDetails,
        _eventReferrableNftDetails
      );
    }
    else{
      normalEventNft.eventMint(
      _tokenId,
      msg.sender,
      _eventDetails,
      _eventNormalNftDetails
      );
    }
    organizerAddressToOrganizerEvents[msg.sender].push(_tokenId);
    organizerAddressToOrganizerEventsLength[msg.sender]++;
    eventIdToOrganizerAddress[_tokenId] = msg.sender;

    emit eventNFTMinted(_eventDetails, _eventNormalNftDetails, _eventReferrableNftDetails);
  }

  function getOrganizerAllEvents() external view returns(uint[] memory){
    return organizerAddressToOrganizerEvents[msg.sender];
  }

  // function getAllEvents() external view returns(uint[] memory) {
  //   return events;
  // }

  // function getEventsLength() external view returns(uint) {
  //   return events.length;
  // }

}
