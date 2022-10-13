import { ethers } from "ethers";
import { getContractEssentials } from "./helpers";
import eventAbi from "../abi/Event.json";

async function getEventContract(address) {
  let { provider, signer } = await getContractEssentials();

  const eventReadContract = new ethers.Contract(
    address,
    eventAbi,
    provider
  );

  let eventWriteContract = eventReadContract.connect(signer);

  return { eventReadContract, eventWriteContract };
}

export { getEventContract };