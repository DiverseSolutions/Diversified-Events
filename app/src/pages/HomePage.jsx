import { useState, useEffect } from "react";
import EventCardData from "../../dummyData/EventCardData";
import Card from "../components/EventCard";

import { getEventContract } from "../../contracts/EventContractHelper";
import { getEventFactoryContract } from "../../contracts/EventFactoryContractHelper.jsx";

export default function HomePage() {
  const [events, setEvents] = useState();

  useEffect(() => {
    getAllEventAddresses();
  }, []);

  useEffect(() => {
    getAllEvents();
  }, []);

  async function getAllEventAddresses() {
    try {
      const { eventFactoryReadContract } = await getEventFactoryContract();
      let result = await eventFactoryReadContract.getAllEvents();
      let results = result.map((i) => i.toNumber());
      setEvents(results);
    } catch (e) {
      console.log(e);
    }
  }

  async function getAllEvents() {
    const { eventFactoryReadContract } = await getEventFactoryContract();
    let allEventIds = await eventFactoryReadContract.getAllEvents();

    let eventDataArray = [];

    for (let id of allEventIds) {
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
        let eventDetails = await eventReadContract.eventDetails();
        let eventNftDetails = await eventReadContract.eventNftDetails();
        let eventStatus = await eventReadContract.eventStatus();

        let eventData = {
          eventDetails,
          eventNftDetails,
          eventStatus,
        };

        eventDataArray.push(eventData);
      }
    }

    console.log(eventDataArray);
    setEvents(eventDataArray);
  }

  return (
    <div className='min-h-screen w-full flex justify-center mt-10'>
      <div className='flex max-w-5xl justify-center'>
        <div className='grid grid-cols-3 gap-3 w-full h-64'>
          {events.map((data, index) => (
            <Card key={index} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
}
