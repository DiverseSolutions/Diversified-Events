import { useState, useEffect } from "react";
import CardDetail from "../components/CardDetail";
import { getOrganizerNftContract } from "../../contracts/OrganizerNFTContractHelper";
import { getOrganizerFactoryContract } from "../../contracts/OrganizerContractHelper";
import { getEventFactoryContract } from "../../contracts/EventFactoryContractHelper";
import { getEventContract } from "../../contracts/EventContractHelper";
import Logo from "../../assets/logo.png";

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

  if (organizerData == null) {
    return <></>;
  }

  return (
    <div className='flex w-full justify-center p-5 lg:p-3'>
      <div className='flex flex-col sm:flex-row max-w-5xl w-full mt-10 gap-8'>
        <div className='flex flex-col w-full sm:w-5/12 lg:w-4/12 justify-center text-center border rounded-xl h-58 sm:h-80 px-4 py-2'>
          <div className='w-full flex justify-center'>
            <img src={Logo} width={"80px"} height={"80px"} alt='Diverse logo' />
          </div>
          <div className='flex flex-col gap-1 mt-4'>
            <span className='font-medium text-sm'>
              <span className='text-gray-500'>Username: </span>
              {organizerData && organizerData.username}
            </span>
            <span className='text-sm font-semibold'>
              <span className='text-gray-500'> Email: </span>
              {organizerData && organizerData.email}
            </span>
            <span className='text-sm font-semibold'>
              <span className='text-gray-500'>LinkedIn: </span>
              {organizerData && organizerData.linkedIn}
            </span>
          </div>
        </div>
        <div className='w-full sm:w-7/12 lg:w-8/12 '>
          <div className='flex items-center w-full justify-between'>
            <span className='text-xl font-bold'>My Events</span>
            <button className='flex gap-1 border rounded-3xl px-4 py-2 items-center'>
              <span>All</span>
              <svg width='1.5em' height='1.5em' viewBox='0 0 24 24'>
                <path
                  fill='currentColor'
                  d='M12 14.975q-.2 0-.387-.075q-.188-.075-.313-.2l-4.6-4.6q-.275-.275-.275-.7q0-.425.275-.7q.275-.275.7-.275q.425 0 .7.275l3.9 3.9l3.9-3.9q.275-.275.7-.275q.425 0 .7.275q.275.275.275.7q0 .425-.275.7l-4.6 4.6q-.15.15-.325.212q-.175.063-.375.063Z'
                ></path>
              </svg>
            </button>
          </div>
          <div className='grid lg:grid-cols-2 gap-3'>
            <CardDetail events={events} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyEvent;
