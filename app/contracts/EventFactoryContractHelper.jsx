import { ethers } from "ethers";
import { getContractEssentials } from "./helpers";
import { eventFactory } from "../genAddresses.json";
import eventFactoryAbi from "../abi/EventFactory.json";

async function getEventFactoryContract() {
  let { provider, signer } = await getContractEssentials();

  const eventFactoryReadContract = new ethers.Contract(
    eventFactory,
    eventFactoryAbi,
    provider
  );

  let eventFactoryWriteContract = eventFactoryReadContract.connect(signer);

  return { eventFactoryReadContract, eventFactoryWriteContract };
}

export { getEventFactoryContract };
