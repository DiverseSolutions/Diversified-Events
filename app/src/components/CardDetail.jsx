import React from "react";
import { ethers } from "ethers";
import moment from "moment";

const CardDetail = ({ events }) => {
  return (
    <>
      {events.length > 0 ? (
        events.map((data, index) => {
          return (
            <div
              className='flex flex-col w-full p-5 border rounded-2xl mt-4 gap-2 hover:border-black'
              key={index}
            >
              <div className='flex justify-center w-full rounded-xl'>
                <img
                  src={data.eventDetails.profile}
                  width='100%'
                  alt='Event image'
                  className='rounded-xl'
                />
              </div>
              <span className='font-bold text-xl text-center break-all'>
                {data.eventDetails.name}
              </span>
              <span className='text-gray-700 font-medium text-center '>
                {data.eventDetails?.description.length > 50
                  ? data.eventDetails?.description.substring(0, 100) + "..."
                  : "" ?? ""}
              </span>

              <a
                className='text-gray-700 font-medium text-center'
                href={data.eventDetails.socialLink}
                target={"_blank"}
              >
                <span className='text-black break-all'>Social Link: </span>
                {data.eventDetails.socialLink}
              </a>

              <div className='flex justify-center w-full break-all'>
                <span className='font-semibold'>Date:</span>{" "}
                {moment(data.eventDetails.date.toNumber() * 1000).format("lll")}
              </div>
              <span className='text-center mt-2'>
                <span className='font-semibold'>Price: </span>
                {ethers.utils.formatUnits(
                  data.eventNftDetails.price ?? "",
                  18
                )}{" "}
                KLAY
              </span>
            </div>
          );
        })
      ) : (
        <div className='flex w-full justify-start mt-5'>
          <span className='text-center'>There are no events yet...</span>
        </div>
      )}
    </>
  );
};

export default CardDetail;
