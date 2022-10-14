import { useState, useEffect } from "react";
import QRCode from "react-qr-code";

import EventCardData from "../../dummyData/EventCardData";
import EventCardNft from "../components/EventCardNft";

import { getOrganizerNftContract } from "../../contracts/OrganizerNFTContractHelper";
import { getOrganizerFactoryContract } from "../../contracts/OrganizerContractHelper";
import { getEventFactoryContract } from "../../contracts/EventFactoryContractHelper";
import { getEventContract } from "../../contracts/EventContractHelper";
import { getNftContract } from "../../contracts/NftContractHelper";

export default function MyNFTs() {
  const [organizerData, setOrganizerData] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getOrganizerData();
    getOrganizerEvents();
  }, []);

  async function getOrganizerData() {
    const { organizerReadContract } = await getOrganizerFactoryContract();
    const { organizerNftReadContract } = await getOrganizerNftContract();

    let id = await organizerReadContract.addressToOrganizerId(
      ethereum.selectedAddress
    );
    let data = await organizerNftReadContract.getOrganizerDetail(id.toNumber());
    setOrganizerData(data);
  }

  async function getOrganizerEvents() {
    const { eventFactoryReadContract } = await getEventFactoryContract();
    let organizerEventIds = await eventFactoryReadContract.getOrganizerEvents(
      ethereum.selectedAddress
    );

    let eventDataArray = [];

    for (let id of organizerEventIds) {
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
          id: id.toNumber(),
          eventDetails,
          eventNftDetails,
          eventStatus,
        };

        eventDataArray.push(eventData);
      }
    }

    setEvents(eventDataArray);
  }
  return (
    <div className="min-h-screen w-full flex justify-center mt-10 p-5 lg:p-3">
      <div className="flex max-w-5xl justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full h-64">
          {events.length > 0 ? (
            events.map((data, index) => {
              if (data.eventDetails == undefined) return <></>;
              return <EventCardNft key={index} data={data} />;
            })
          ) : (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="text-center">There are no events yet...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
