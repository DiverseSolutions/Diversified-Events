const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("OrganizerFactory - Functionality Test", function () {

  beforeEach(async function () {
    let accounts = await ethers.getSigners();
    this.odko = accounts[0]
    this.ireedui = accounts[1]
    this.OrganizerFactory = await ethers.getContractFactory("OrganizerFactory");
    this.organizerFactoryContract = await this.OrganizerFactory.deploy();
    await this.organizerFactoryContract.deployed();
  });

  it("checks organizer creation process", async function () {

    let tx = await this.organizerFactoryContract.connect(this.odko).createOrganizer(
      "mnkhod",
      "https://www.linkedin.com/in/mnkhod/",
      "mnkhod.dev@gmail.com"
    )

    receipt = await tx.wait();
    expect(receipt.events[1].args.organizerId).to.equal(0);
    expect(receipt.events[1].args.organizerAddress).to.equal(this.odko.address);
    expect(await this.organizerFactoryContract.organizerLength()).to.equal(1);

    await expect(this.organizerFactoryContract.connect(this.odko).createOrganizer(
      "mnkhzul",
      "https://www.linkedin.com/in/mnkhzul/",
      "mnkhzul.dev@gmail.com"
    )).to.be.revertedWith("ACCOUNT ALREADY HAS NFT");

  });

  it("checks organizer deletion process", async function () {
    
    await this.organizerFactoryContract.connect(this.odko).createOrganizer(
      "mnkhod",
      "https://www.linkedin.com/in/mnkhod/",
      "mnkhod.dev@gmail.com"
    )

    let odkosId = await this.organizerFactoryContract.connect(this.odko).addressToOrganizerId(this.odko.address)
    let deletingTx = await this.organizerFactoryContract.deleteOrganizer(odkosId)
    let deletingReceipt = await deletingTx.wait();
    
    expect(deletingReceipt.events[2].args.organizerId).to.equal(0);
    expect(deletingReceipt.events[2].args.organizerAddress).to.equal(this.odko.address);
    expect(await this.organizerFactoryContract.organizerLength()).to.equal(0);
    expect(await this.organizerFactoryContract.organizerHasNft(this.odko.address)).to.equal(false);
    });

});