import { useState, useEffect } from "react";
import EventCardData from "../../dummyData/EventCardData";
import Card from "../components/EventCard";

import { getEventFactoryContract } from "../../contracts/EventFactoryContractHelper.jsx";

export default function HomePage() {
  const [events, setEvents] = useState();

  useEffect(() => {
    getAllEventAddresses();
  }, []);

  async function getAllEventAddresses() {
    try{
      const { eventFactoryReadContract } = await getEventFactoryContract();
      let result = await eventFactoryReadContract.getAllEvents();
      let results = result.map((i) => i.toNumber())
      setEvents(results);
    }catch(e){
      console.log(e)
    }
  }

  return (
    <div className='min-h-screen w-full flex justify-center mt-10'>
      <div className='flex max-w-5xl justify-center'>
        <div className='grid grid-cols-3 gap-3 w-full h-64'>
          {EventCardData.map((data, index) => (
            <Card key={index} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
}
