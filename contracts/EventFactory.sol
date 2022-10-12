// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./nfts/NormalEventNFT.sol";
import "./nfts/ReferrableEventNFT.sol";

import "./functionality/ReferrableEvent.sol";
import "./functionality/NormalEvent.sol";

import "./structs/EventDetails.sol";
import "./structs/EventNormalNftDetails.sol";
import "./structs/EventReferrableNftDetails.sol";
import "./structs/OrganizerDetail.sol";

import "../contracts/OrganizerFactory.sol";

import "./interfaces/IOrganizerNFT.sol";

contract EventFactory is AccessControl {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIdCounter;

  mapping(address => uint[]) public organizerAddressToOrganizerEvents;
  mapping(address => uint) public organizerAddressToOrganizerEventsLength;
  mapping(uint => address) public eventIdToOrganizerAddress;

  uint[] public events;


  // NormalEventNFT public normalEventNft;
  // ReferrableEventNFT public referrableEventNft;
  IOrganizerNFT public organizerNft;

  OrganizerFactory public organizerFactory;

  OrganizerDetail[] public organizerDetails;
  
  NormalEvent public normalEvent;
  ReferrableEvent public referrableEvent;

  event EventCreated (
    uint indexed eventId,
    address indexed organizerAddress,
    bool indexed isReferrable
  );

  constructor(address _organizerNft) {
    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    organizerNft = IOrganizerNFT(_organizerNft);

    referrableEvent = new ReferrableEvent(address(this));
    normalEvent = new NormalEvent(address(this));
    // normalEventNft = new NormalEventNFT(address(this));
    // referrableEventNft = new ReferrableEventNFT(address(this));
  }

  function createNormalEvent(
    EventDetails calldata _eventDetails,
    EventNormalNftDetails calldata _eventNormalNftDetails
  ) external {
    require(organizerNft.balanceOf(msg.sender) > 0,"USER ISN'T ORGANIZER");
    uint256 _tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    
    normalEvent.createEvent(
      msg.sender,
      _tokenId,
      _eventDetails,
      _eventNormalNftDetails
    );

    organizerAddressToOrganizerEvents[msg.sender].push(_tokenId);
    organizerAddressToOrganizerEventsLength[msg.sender]++;
    eventIdToOrganizerAddress[_tokenId] = msg.sender;

    events.push(_tokenId);

    emit EventCreated(_tokenId, msg.sender, false);
  }

  function createReferrableEvent(
    EventDetails calldata _eventDetails,
    EventNormalNftDetails calldata _eventNormalNftDetails,
    EventReferrableNftDetails calldata _eventReferrableNftDetails
  ) external {
    require(organizerNft.balanceOf(msg.sender) > 0,"USER ISN'T ORGANIZER");
    
    uint256 _tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    
    referrableEvent.createEvent(
        msg.sender,
        _tokenId,
        _eventDetails,
        _eventNormalNftDetails,
        _eventReferrableNftDetails
    );
    
    organizerAddressToOrganizerEvents[msg.sender].push(_tokenId);
    organizerAddressToOrganizerEventsLength[msg.sender]++;
    eventIdToOrganizerAddress[_tokenId] = msg.sender;

    events.push(_tokenId);
    
    emit EventCreated(_tokenId, msg.sender, true);
  }

  function getOrganizerAllEvents() external view returns(uint[] memory){
    return organizerAddressToOrganizerEvents[msg.sender];
  }

  function getAllEvents() external view returns(uint[] memory) {
    return events;
  }

  function getEventsLength() external view returns(uint) {
    return events.length;
  }

}
