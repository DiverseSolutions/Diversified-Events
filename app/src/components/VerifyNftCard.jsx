import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode";
import { getOrganizerNftContract } from "../../contracts/OrganizerNFTContractHelper";
import { getOrganizerFactoryContract } from "../../contracts/OrganizerContractHelper";
import { getEventFactoryContract } from "../../contracts/EventFactoryContractHelper";
import { getEventContract } from "../../contracts/EventContractHelper";

const VerifyNftCard = (props) => {
  const [organizerData, setOrganizerData] = useState(null);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const { data } = props;

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

    console.log(eventDataArray);
    setEvents(eventDataArray);
  }

  function onScanSuccess(decodedText, decodedResult) {
    // handle the scanned code as you like, for example:
    console.log(`Code matched = ${decodedText}`, decodedResult);
  }

  function onScanFailure(error) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${error}`);
  }

  async function onVerifyBtn() {
    const html5QrCode = new Html5Qrcode(`${data.name}-reader`);
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
      /* handle success */
      alert(decodedText);
    };
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    // If you want to prefer front camera
    html5QrCode.start(
      { facingMode: "environment" },
      config,
      qrCodeSuccessCallback
    );
  }

  return (
    <div className="flex flex-col justify-start text-center border rounded-2xl min-h-60 p-3 hover:border-black cursor-pointer select-none">
      <div className="w-full flex justify-center">
        <img
          src={data.logo}
          width={"80px"}
          height={"80px"}
          alt=""
          className="flex justify-center text-center"
        />
      </div>
      <span className="font-medium text-xs">{data.date}</span>
      <span className="text-lg font-semibold">{data.name}</span>
      <span className="font-medium text-gray-500 hover:underline cursor-pointer">
        {data.organizer}
      </span>
      <div className="flex justify-center mt-2 items-center">
        <button
          className="flex justify-center px-10 py-1 border rounded-3xl hover:border-black"
          onClick={() => onVerifyBtn()}
        >
          Verify
        </button>

        <div id={`${data.name}-reader`} width="900px" height="900px"></div>
      </div>
    </div>
  );
};

export default VerifyNftCard;
