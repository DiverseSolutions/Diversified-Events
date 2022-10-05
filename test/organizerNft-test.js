const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("OrganizerNft - Functionality Test", function () {

  beforeEach(async function () {
    let accounts = await ethers.getSigners();
    this.odko = accounts[0]
    this.ireedui = accounts[1]
    this.OrganizerFactory = await ethers.getContractFactory("OrganizerFactory");
    this.organizerFactoryContract = await this.OrganizerFactory.deploy();
    await this.organizerFactoryContract.deployed();
    await this.organizerFactoryContract.connect(this.odko).createOrganizer(
      "mnkhod",
      "https://www.linkedin.com/in/mnkhod/",
      "mnkhod.dev@gmail.com"
    )
  });

    it("checks nft's details", async function () {
      
    let nftId = await this.organizerFactoryContract.addressToOrganizerId(this.odko.address)
    let nftAddress = await this.organizerFactoryContract.nft() 
    const nft = await ethers.getContractAt('OrganizerNFT',nftAddress)
    const nftDetail = await nft.getOrganizerDetail(nftId)

    expect(nftDetail.username).to.equal("mnkhod");
    expect(nftDetail.linkedIn).to.equal("https://www.linkedin.com/in/mnkhod/");
    expect(nftDetail.email).to.equal("mnkhod.dev@gmail.com");
    expect(nftDetail.eventIds.length).to.equal(0);
  });

});

