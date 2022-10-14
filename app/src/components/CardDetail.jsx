import React from "react";
import moment from "moment";
import CardDetails from "../../dummyData/CardDetail";

const CardDetail = ({ events }) => {
  return (
    <>
      {events.length > 0 ? (
        events.map((data, index) => {
          return (
            <div
              className='flex flex-col w-full p-5 border rounded-2xl mt-4 gap-2 hover:border-black cursor-pointer'
              key={index}
            >
              <span className='font-bold text-xl'>
                {data.eventDetails.name}
              </span>
              <span className='text-gray-700 font-medium'>
                {data.eventDetails.description}
              </span>
              <div className='w-full rounded-xl'>
                <img
                  src={data.eventDetails.profile}
                  width='50%'
                  alt=''
                  className='rounded-xl'
                />
              </div>
              <span className='text-gray-700 font-medium'>
                {data.eventDetails.socialLink}
              </span>
              <div className='flex justify-between'>
                <span>
                  <span className='font-semibold'>Date:</span>{" "}
                  {Date(data.eventDetails.date.toNumber() * 1000)}
                </span>
              </div>
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
