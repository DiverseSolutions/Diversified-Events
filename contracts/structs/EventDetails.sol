// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

struct EventDetails {
    string eventName;
    string eventProfileUrl;
    string eventDescription;
    string eventLocation;
    uint256 eventDate;
    string eventSocialLinks;
    address[] eventAdmins;
}