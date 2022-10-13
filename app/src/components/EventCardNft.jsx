import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { useDispatch } from "react-redux";
import { showQrModal } from "../slices/modalSlice";

const EventCardNft = (props) => {
  const dispatch = useDispatch();
  const { data } = props;

  return (
    <div className='flex flex-col justify-start text-center border rounded-2xl min-h-60 p-5 cursor-pointer select-none'>
      <div className='w-full flex justify-center'>
        <img
          src={data.eventDetails?.profile ?? ""}
          width={"80px"}
          height={"80px"}
          alt='Event Image'
          className='flex justify-center text-center rounded-2xl'
        />
      </div>

      <div className='flex flex-col my-2'>
        <span className='font-medium text-lg'>
          {data.eventDetails?.name ?? ""}
        </span>
        <span className='text-sm font-semibold'>
          {data.eventDetails?.description ?? ""}
        </span>
      </div>
      <div className='flex flex-col gap-1'>
        <span>
          <span className='font-semibold'>Social Link: </span>
          {data.eventDetails?.socialLink ?? ""}
        </span>
        <span>
          <span className='font-semibold'>Date: </span>{" "}
          {moment(data.eventDetails.date.toNumber() * 1000).format("lll")}
        </span>
      </div>
      <span className='font-medium text-gray-500 hover:underline cursor-pointer'>
        {/* {data.eventDetails.organizer} */}
      </span>
      <div className='flex justify-center mt-2 items-center'>
        <button
          className='flex justify-center px-10 py-1 border rounded-3xl hover:border-black'
          onClick={() => dispatch(showQrModal(data.id))}
        >
          Show QR
        </button>
      </div>
    </div>
  );
};

export default EventCardNft;
