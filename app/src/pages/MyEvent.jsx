import { useState, useEffect } from "react";
import CardDetail from "../components/CardDetail";
import { getOrganizerNftContract } from "../../contracts/OrganizerNFTContractHelper";
import { getOrganizerFactoryContract } from "../../contracts/OrganizerContractHelper";
import { getEventFactoryContract } from "../../contracts/EventFactoryContractHelper";
import { getEventContract } from "../../contracts/EventContractHelper";
import { logger } from "ethers";

const MyEvent = () => {
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
    // console.log(data);
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
          eventDetails,
          eventNftDetails,
          eventStatus,
        };

        eventDataArray.push(eventData);
      }
    }

    // console.log(eventDataArray);
    setEvents(eventDataArray);
  }

  return (
    <div className="flex w-full justify-center">
      <div className="flex max-w-5xl w-full mt-10 gap-8">
        <div className="flex flex-col w-3/12 justify-center text-center border rounded-xl h-80 px-4">
          <div className="w-full flex justify-center">
            <img
              src={
                "https://cdn.stamp.fyi/space/ens.eth?s=160&cb=bc8a2856691e05ab"
              }
              width={"80px"}
              height={"80px"}
              alt=""
              className="flex "
            />
          </div>
          <span className="font-medium text-xs">
            SUNDAY, OCT 2 AT 11:30 PM UTC+08
          </span>
          <span className="text-lg font-semibold">
            React Native/ JS/ TS doubt demolition
          </span>
          <span className="font-medium text-gray-500 hover:underline cursor-pointer">
            TEDx
          </span>
        </div>
        <div className="w-9/12">
          <div className="flex items-center w-full justify-between">
            <span className="text-xl font-bold">My Events</span>
            <button className="flex gap-1 border rounded-3xl px-4 py-2 items-center">
              <span>All</span>
              <svg width="1.5em" height="1.5em" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 14.975q-.2 0-.387-.075q-.188-.075-.313-.2l-4.6-4.6q-.275-.275-.275-.7q0-.425.275-.7q.275-.275.7-.275q.425 0 .7.275l3.9 3.9l3.9-3.9q.275-.275.7-.275q.425 0 .7.275q.275.275.275.7q0 .425-.275.7l-4.6 4.6q-.15.15-.325.212q-.175.063-.375.063Z"
                ></path>
              </svg>
            </button>
          </div>
          <CardDetail />
        </div>
      </div>
    </div>
  );
};

export default MyEvent;
