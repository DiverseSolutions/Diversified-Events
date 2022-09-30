// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./interfaces/IOrganizerNFT.sol";
import "./nfts/OrganizerNFT.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract OrganizerFactory is AccessControl {
  mapping(address => uint) public addressToOrganizerId;
  mapping(address => bool) public organizerHasNft;
  mapping(uint => address) public idToOrganizerAddress;
  uint public organizerLength = 0;

  OrganizerNFT public nft;

  constructor() {
    _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
    nft = new OrganizerNFT(address(this));
  }

  function createOrganizer(
    string memory _username,
    string memory _linkedIn,
    string memory _email
  ) external {
    require(organizerHasNft[msg.sender] == false,"ACCOUNT ALREADY HAS NFT");

    uint id = nft.organizerMint(
      msg.sender,
      _username,
      _linkedIn,
      _email
    );

    addressToOrganizerId[msg.sender] = id;
    idToOrganizerAddress[id] = msg.sender;
    organizerHasNft[msg.sender] = true;

    organizerLength += 1;
  }

}
