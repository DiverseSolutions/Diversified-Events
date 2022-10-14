import { useState, useEffect } from "react";
import VerifyNftCard from "../components/VerifyNftCard";

import { getEventFactoryContract } from "../../contracts/EventFactoryContractHelper";
import { getEventContract } from "../../contracts/EventContractHelper";

export default function VerifyNfts() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getUserNfts();
  }, []);

  async function getUserNfts() {
    const userAddress = ethereum.selectedAddress;

    const { eventFactoryReadContract } = await getEventFactoryContract();
    let eventIds = await eventFactoryReadContract.getAllEvents();

    let eventDataArray = [];

    for (let id of eventIds) {
      let eventAddress = null;

      try {
        eventAddress = await eventFactoryReadContract.eventIdToAddress(
          id.toNumber()
        );
      } catch (e) {
        console.log(e);
      }

      if (eventAddress != null) {
        const { eventReadContract } = await getEventContract(eventAddress);
        let organizerAddress = await eventReadContract.organizer();

        if (organizerAddress.toUpperCase() == userAddress.toUpperCase()) {
          let eventDetails = await eventReadContract.eventDetails();
          let eventNftDetails = await eventReadContract.eventNftDetails();
          let eventStatus = await eventReadContract.eventStatus();

          let eventData = {
            id: id.toNumber(),
            eventDetails,
            eventNftDetails,
            eventStatus,
          };

          eventDataArray.push(eventData);
        }
      }
    }

    console.log(eventDataArray);
    setEvents(eventDataArray);
  }

  return (
    <div className='min-h-screen w-full flex justify-center mt-10'>
      <div className='flex max-w-5xl justify-center'>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-3 w-full h-64'>
          {events.map((data, index) => (
            <VerifyNftCard key={index} events={events} />
          ))}
        </div>
      </div>
    </div>
  );
}
