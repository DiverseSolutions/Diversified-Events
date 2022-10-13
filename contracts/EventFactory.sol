// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "./functionality/Event.sol";

import "./structs/EventDetails.sol";
import "./structs/EventNftDetails.sol";

import "../contracts/OrganizerFactory.sol";
import "./interfaces/IOrganizerNFT.sol";

contract EventFactory is AccessControl {
  mapping(address => uint[]) public addressToOrganizerEventIds;
  mapping(uint => address) public eventIdToAddress;

  uint[] public events;
  uint public eventId;

  OrganizerFactory public organizerFactory;
  IOrganizerNFT public organizerNft;

  event EventCreated (
    uint indexed eventId,
    address indexed organizerAddress,
    bool indexed isReferrable
  );

  constructor(address _organizerNft) {
    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    organizerNft = IOrganizerNFT(_organizerNft);

    eventId = 1;
  }

  function createEvent(
    EventDetails calldata _eventDetails,
    EventNftDetails calldata _eventNormalNftDetails
  ) isOrganizer() external {
    require(organizerNft.balanceOf(msg.sender) > 0,"USER ISN'T ORGANIZER");

    Event _event = new Event(
      msg.sender,
      eventId,
      _eventDetails,
      _eventNormalNftDetails
    );

    addressToOrganizerEventIds[msg.sender].push(eventId);
    eventIdToAddress[eventId] = address(_event);

    events.push(eventId);
    emit EventCreated(eventId, msg.sender, false);
    eventId += 1;
  }

  function getOrganizerAllEvents() external view returns(uint[] memory){
    return addressToOrganizerEventIds[msg.sender];
  }

  function getOrganizerEvents(address _organizer) external view returns(uint[] memory){
    return addressToOrganizerEventIds[_organizer];
  }

  function getAllEvents() external view returns(uint[] memory) {
    return events;
  }

  function getEventsLength() external view returns(uint) {
    return events.length;
  }

  modifier isOrganizer(){
    require(organizerNft.balanceOf(msg.sender) > 0,"NOT ORGANIZER");
    _;
  }

}
