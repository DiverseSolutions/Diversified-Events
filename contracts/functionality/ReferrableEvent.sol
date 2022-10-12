// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "../nfts/NormalEventNFT.sol";
import "../nfts/ReferrableEventNFT.sol";

import "../nfts/NormalAccessNFT.sol";
import "../nfts/ReferrableAccessNFT.sol";

import "../structs/EventDetails.sol";
import "../structs/EventNormalNftDetails.sol";
import "../structs/EventReferrableNftDetails.sol";
import "../structs/OrganizerDetail.sol";

import "../enums/EventStatus.sol";

import "../EventFactory.sol";

contract ReferrableEvent {
    EventFactory public eventFactory;

    EventStatus[] public eventStatus;

    NormalEventNFT public normalEventNft;
    ReferrableEventNFT public referrableEventNft;

    NormalAccessNFT public normalAccessNft;
    ReferrableAccessNFT public referrableAccessNft;

    EventDetails[] public eventDetails;
    EventNormalNftDetails[] public eventNormalNftDetails;
    EventReferrableNftDetails[] public eventReferrableNftDetails;

    mapping(address => uint) public referralCount;
    mapping(address => address[]) public referredUsers;

    event eventStatusChanged(
        uint256 indexed eventId,
        EventStatus indexed eventStatus
    );

    event eventDetailsAdded(
        EventDetails eventDetails,
        EventNormalNftDetails eventNormalNftDetails,
        EventReferrableNftDetails eventReferrableNftDetails
    );

    event NormalAccessNftMinted(
        uint256 indexed eventId,
        address indexed user
    );

    event ReferrableAccessNftMinted(
        uint256 indexed eventId,
        address indexed user
    );
    
    constructor(address _eventFactory) {
        eventFactory = EventFactory(_eventFactory);
        
        normalEventNft = new NormalEventNFT(address(this));
        referrableEventNft = new ReferrableEventNFT(msg.sender);

        normalAccessNft = new NormalAccessNFT(address(this));
        referrableAccessNft = new ReferrableAccessNFT(msg.sender);
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
        EventNormalNftDetails calldata _eventNormalNftDetails,
        EventReferrableNftDetails calldata _eventReferrableNftDetails
    ) external {
        referrableEventNft.eventMint(_eventId, _to);

        eventDetails.push(_eventDetails);
        eventNormalNftDetails.push(_eventNormalNftDetails);
        eventReferrableNftDetails.push(_eventReferrableNftDetails);
        eventStatus.push();

        emit eventDetailsAdded(_eventDetails, _eventNormalNftDetails, _eventReferrableNftDetails);
    }
    
    function mintNormalAccessNft (uint _eventId) public {
        require(normalAccessNft.balanceOf(msg.sender) == 0, "You already have normal access to this event");
        require(eventNormalNftDetails[_eventId].normalNftLimit > normalAccessNft._tokenIdCounter(), "Normal NFT limit reached");

        normalAccessNft.safeMint(msg.sender);

        emit NormalAccessNftMinted(_eventId, msg.sender);
    }

    function mintReferrableAccessNft (uint _eventId) public {
        require(referrableAccessNft.balanceOf(msg.sender) == 0, "You already have referrable access to this event");
        require(eventReferrableNftDetails[_eventId].referrableNftLimit > referrableAccessNft._tokenIdCounter(), "Referrable NFT limit reached");
        
        referrableAccessNft.safeMint(msg.sender);

        emit ReferrableAccessNftMinted(_eventId, msg.sender);
    }

    function referUsers (uint _eventId, address[] calldata _users) public {
        require(referrableAccessNft.balanceOf(msg.sender) > 0, "You don't have referrable access to this event");
        require(eventReferrableNftDetails[_eventId].referrableNftReferralLimit > (_users.length + referralCount[msg.sender]), "Referrable NFT limit reached");

        for (uint i = 0; i < _users.length; i++) {
            referralCount[msg.sender]++;
            referredUsers[msg.sender].push(_users[i]);
        }
    }

    function setEventStatus (uint _eventId, uint _status) public onlyEventOwner(_eventId) {
        eventStatus[_eventId] = EventStatus(_status);
        emit eventStatusChanged(_eventId, EventStatus(_status));
    }

    function cancelEvent (uint _eventId) public onlyEventOwner(_eventId){
        eventStatus[_eventId] = EventStatus.Canceled;
        emit eventStatusChanged(_eventId, EventStatus.Canceled);
    }

    function postponeEvent (uint _eventId) public onlyEventOwner(_eventId){
        eventStatus[_eventId] = EventStatus.Postponed;
        emit eventStatusChanged(_eventId, EventStatus.Postponed);
    }
    
    function getEventStatus (uint _eventId) public view returns (EventStatus) {
        return eventStatus[_eventId];
    }

    function getEventAllDetails(uint _eventId) public view returns (EventDetails memory, EventNormalNftDetails memory, EventReferrableNftDetails memory) {
        return (eventDetails[_eventId], eventNormalNftDetails[_eventId], eventReferrableNftDetails[_eventId]);
    }
}