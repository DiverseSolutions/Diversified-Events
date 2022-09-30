const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("OrganizerFactory - Functionality Test", function () {

  beforeEach(async function () {
    let accounts = await ethers.getSigners();
    this.odko = accounts[0] 
    this.OrganizerFactory = await ethers.getContractFactory("OrganizerFactory");
    this.organizerFactoryContract = await this.OrganizerFactory.deploy();
    await this.organizerFactoryContract.deployed();
  });

  it("Create Organizer - Success Test/Failure Test", async function () {

    let tx = await this.organizerFactoryContract.createOrganizer(
      "mnkhod",
      "https://www.linkedin.com/in/mnkhod/",
      "mnkhod.dev@gmail.com"
    )

    await tx.wait();

    expect(await this.organizerFactoryContract.organizerLength()).to.equal(1);

    await expect(this.organizerFactoryContract.createOrganizer(
      "mnkhzul",
      "https://www.linkedin.com/in/mnkhzul/",
      "mnkhzul.dev@gmail.com"
    )).to.be.revertedWith("ACCOUNT ALREADY HAS NFT");

    let nftId = await this.organizerFactoryContract.addressToOrganizerId(this.odko.address)
    let nftAddress = await this.organizerFactoryContract.nft() 
    const nft = await ethers.getContractAt('OrganizerNFT',nftAddress)
    const nftDetail = await nft.getOrganizerDetail(nftId)


    expect(nftDetail.username).to.equal("mnkhod");
    expect(nftDetail.linkedIn).to.equal("https://www.linkedin.com/in/mnkhod/");
    expect(nftDetail.email).to.equal("mnkhod.dev@gmail.com");
    // expect(nftDetail.jobsCreated.length).to.equal(0);
  });

});

