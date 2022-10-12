// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "../nfts/NormalEventNFT.sol";

import "../nfts/NormalAccessNFT.sol";

import "../structs/EventDetails.sol";
import "../structs/EventNormalNftDetails.sol";
import "../structs/EventReferrableNftDetails.sol";
import "../structs/OrganizerDetail.sol";

import "../enums/EventStatus.sol";

import "../EventFactory.sol";

contract NormalEvent {

    EventFactory public eventFactory;
   
    NormalEventNFT public normalEventNft;
    NormalAccessNFT public normalAccessNft;

    EventStatus[] public eventStatus;
    EventDetails[] public eventDetails;
    EventNormalNftDetails[] public eventNormalNftDetails;
    EventReferrableNftDetails[] public eventReferrableNftDetails;

    event EventStatusChanged(
        uint256 indexed eventId,
        EventStatus indexed eventStatus
    );

    event eventDetailsAdded(
        EventDetails eventDetails,
        EventNormalNftDetails eventNormalNftDetails
    );

    event NormalAccessNftMinted(
        uint256 indexed eventId,
        address indexed user
    );

    constructor(address _eventFactory) {
        eventFactory = EventFactory(_eventFactory);
        normalEventNft = new NormalEventNFT(address(this));
        normalAccessNft = new NormalAccessNFT(msg.sender);
    }

    modifier onlyEventOwner(uint _eventId) {
        require(
            eventFactory.eventIdToOrganizerAddress(_eventId) == msg.sender,
            "Only event owner can call this function"
        );
        _;
    }

    function createEvent(
        address _to,
        uint256 _eventId,
        EventDetails calldata _eventDetails,
        EventNormalNftDetails calldata _eventNormalNftDetails
    ) external {
        normalEventNft.eventMint(_eventId, _to);

        eventDetails.push(_eventDetails);
        eventNormalNftDetails.push(_eventNormalNftDetails);
        eventReferrableNftDetails.push();
        eventStatus.push();
        
        emit eventDetailsAdded(_eventDetails, _eventNormalNftDetails);
    }

    function mintNormalAccessNft (uint _eventId) public {
        require(normalAccessNft.balanceOf(msg.sender) == 0, "You already have normal access to this event");
        require(eventNormalNftDetails[_eventId].normalNftLimit > normalAccessNft._tokenIdCounter(), "Normal NFT limit reached");

        normalAccessNft.safeMint(msg.sender);

        emit NormalAccessNftMinted(_eventId, msg.sender);
    }

    // function setEventStatus (uint _eventId, uint _status) public onlyEventOwner(_eventId) {
    //     eventStatus[_eventId] = EventStatus(_status);
    //     emit EventStatusChanged(_eventId, EventStatus(_status));
    // }

    function cancelEvent (uint _eventId) public onlyEventOwner(_eventId){
        eventStatus[_eventId] = EventStatus.Canceled;
        emit EventStatusChanged(_eventId, EventStatus.Canceled);
    }

    function postponeEvent (uint _eventId, uint newDate) public onlyEventOwner(_eventId){
        eventStatus[_eventId] = EventStatus.Postponed;
        require(newDate > eventDetails[_eventId].eventDate, "New date must be greater than current date");
        eventDetails[_eventId].eventDate = newDate;
        emit EventStatusChanged(_eventId, EventStatus.Postponed);
    }
    
    function getEventStatus (uint _eventId) public view returns (EventStatus) {
        return eventStatus[_eventId];
    }
    
    function getEventAllDetails(uint _eventId) public view returns (EventDetails memory, EventNormalNftDetails memory) {
        return (eventDetails[_eventId], eventNormalNftDetails[_eventId]);
    }
}