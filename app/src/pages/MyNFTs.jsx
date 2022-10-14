import { useState, useEffect } from "react";
import EventCardNft from "../components/EventCardNft";

import { getEventFactoryContract } from "../../contracts/EventFactoryContractHelper";
import { getEventContract } from "../../contracts/EventContractHelper";
import { getNftContract } from "../../contracts/NftContractHelper";

export default function MyNFTs() {
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
        let nftAddress = await eventReadContract.nft();
        const { nftReadContract } = await getNftContract(nftAddress);
        let balanceBN = await nftReadContract.balanceOf(userAddress);

        if (balanceBN.toNumber() > 0) {
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

    setEvents(eventDataArray);
  }

  return (
    <div className='min-h-screen w-full flex justify-center mt-10 p-5 lg:p-3'>
      <div className='flex max-w-5xl justify-center'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full h-64'>
          {events.length > 0 ? (
            events.map((data, index) => {
              if (data.eventDetails == undefined) return <></>;
              return <EventCardNft key={index} data={data} />;
            })
          ) : (
            <div className='absolute top-1/2 left-4/5 transform -translate-x-1/2 -translate-y-1/2'>
              <span className='text-center'>There are no events yet...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
