const fs = require('fs');
const path = require('path');
const hre = require("hardhat");

async function main() {
  const OrganizerFactory = await ethers.getContractFactory("OrganizerFactory");
  const organizerFactoryContract = await OrganizerFactory.deploy();
  await organizerFactoryContract.deployed();

  let organizerNftAddress = await organizerFactoryContract.nft();

  const eventFactory = await ethers.getContractFactory("EventFactory");
  const eventFactoryContract = await eventFactory.deploy(organizerNftAddress);
  await eventFactoryContract.deployed();

  console.log("organizerNftContract deployed to:", organizerNftAddress);
  console.log("organizerFactoryContract deployed to:", organizerFactoryContract.address);
  console.log("eventFactoryContract deployed to:", eventFactoryContract.address);

  const content = {
    "organizerFactory" : organizerFactoryContract.address,
    "organizerNft" : organizerNftAddress,
    "eventFactory" : eventFactoryContract.address,
  }
  createAddressJson(path.join(__dirname, '/../app/genAddresses.json'),JSON.stringify(content))

}

function createAddressJson(path,content){
  try{
    fs.writeFileSync(path,content)
    console.log("Created Contract Address JSON")
  } catch (err) {
    console.error(err)
    return
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
