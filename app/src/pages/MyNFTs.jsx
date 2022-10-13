import { useState, useEffect } from "react";
import QRCode from "react-qr-code";

import EventCardData from "../../dummyData/EventCardData";
import EventCardNft from "../components/EventCardNft";

import { getEventFactoryContract } from "../../contracts/EventFactoryContractHelper";
import { getEventContract } from "../../contracts/EventContractHelper";
import { getNftContract } from "../../contracts/NftContractHelper";

export default function MyNFTs() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
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
        let balanceBN = await nftReadContract.balanceOf(
          ethereum.selectedAddress
        );

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

    console.log(eventDataArray);
    setEvents(eventDataArray);
  }

  return (
    <div className='min-h-screen w-full flex justify-center mt-10'>
      <div className='flex max-w-5xl justify-center'>
        <div className='grid grid-cols-3 gap-3 w-full h-64'>
          {events.length > 0 &&
            events.map((data, index) => {
              if (data.eventDetails == undefined) return <></>;
              return <EventCardNft key={index} data={data} />;
            })}
        </div>
      </div>
    </div>
  );
}
