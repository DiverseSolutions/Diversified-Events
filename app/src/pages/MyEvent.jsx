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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getOrganizerData();
    getOrganizerEvents();
  }, []);

  async function getOrganizerData() {
    setLoading(true);
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
    setLoading(false);
  }

  if (organizerData == null) {
    return <></>;
  }

  return (
    <div className='flex w-full justify-center p-5 lg:p-3'>
      <div className='flex flex-col sm:flex-row max-w-5xl w-full mt-10 gap-8'>
        {loading ? (
          <div className='flex w-full justify-center'>
            <svg
              className='inline mr-2 w-14 h-14 animate-spin dark:text-gray-200 fill-blue-600'
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='currentColor'
              />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentFill'
              />
            </svg>
          </div>
        ) : (
          <>
            <div className='flex flex-col w-full sm:w-5/12 lg:w-4/12 justify-center text-center border rounded-xl h-58 sm:h-80 px-4 py-2'>
              <div className='w-full flex justify-center'>
                <img
                  src={Logo}
                  width={"80px"}
                  height={"80px"}
                  alt='Diverse logo'
                />
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
          </>
        )}
      </div>
    </div>
  );
};

export default MyEvent;
