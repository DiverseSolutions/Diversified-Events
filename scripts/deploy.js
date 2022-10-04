const fs = require('fs');
const path = require('path');
const hre = require("hardhat");

async function main() {
  const OrganizerFactory = await ethers.getContractFactory("OrganizerFactory");
  const organizerFactoryContract = await OrganizerFactory.deploy();
  await organizerFactoryContract.deployed();

  // const FreelancerFactory = await ethers.getContractFactory("FreelancerFactory");
  // const freelancerFactoryContract = await FreelancerFactory.deploy();
  // await freelancerFactoryContract.deployed();

  let organizerNftAddress = await organizerFactoryContract.nft();
  // let freelancerNftAddress = await freelancerFactoryContract.nft();

  // const JobFactory = await ethers.getContractFactory("JobFactory");
  // const jobFactoryContract = await JobFactory.deploy(organizerNftAddress,freelancerNftAddress);
  // await jobFactoryContract.deployed();

  console.log("organizerFactoryContract deployed to:", organizerFactoryContract.address);
  // console.log("freelancerFactoryContract deployed to:", freelancerFactoryContract.address);
  // console.log("jobFactoryContract deployed to:", jobFactoryContract.address);

  const content = {
    "organizerFactory" : organizerFactoryContract.address,
    // "freelancerFactory" : freelancerFactoryContract.address,
    // "jobFactory" : jobFactoryContract.address,
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
