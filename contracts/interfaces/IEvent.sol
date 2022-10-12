// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../structs/EventDetails.sol";
import "../structs/EventNftDetails.sol";

interface IEvent{
    function createEvent(
        address _to,
        uint256 _eventId,
        EventDetails calldata _eventDetails,
        EventNftDetails calldata _eventNormalNftDetails
    ) external;
}
