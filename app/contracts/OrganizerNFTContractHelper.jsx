import { ethers } from "ethers";
import { getContractEssentials } from "./helpers";
import OrganizerNftAbi from "../abi/OrganizerNFT.json";
import { getOrganizerFactoryContract } from './OrganizerContractHelper.jsx';

async function getOrganizerNftContract() {
  const { organizerReadContract,provider,signer } = await getOrganizerFactoryContract()
  let nftAddress = await organizerReadContract.nft()

  const organizerNftReadContract = new ethers.Contract(
    nftAddress,
    OrganizerNftAbi,
    provider,
  );

  let organizerNftWriteContract = organizerNftReadContract.connect(signer);

  return { organizerNftReadContract, organizerNftReadContract };
}

export { getOrganizerNftContract };
