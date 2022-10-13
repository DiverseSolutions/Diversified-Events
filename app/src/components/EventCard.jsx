import React from "react";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const navigate = useNavigate();
  const { data } = props;

  return (
    <div
      className='flex flex-col justify-start text-center border rounded-2xl h-60 p-3 hover:border-black cursor-pointer select-none'
      onClick={() => navigate("/event-detail")}
    >
      <div className='w-full flex justify-center'>
        <img
          src={data.logo}
          width={"80px"}
          height={"80px"}
          alt=''
          className='flex justify-center text-center'
        />
      </div>
      <span className='font-medium text-xs'>{data.date}</span>
      <span className='text-lg font-semibold'>{data.name}</span>
      <span className='font-medium text-gray-500 hover:underline cursor-pointer'>
        {data.organizer}
      </span>
      <div className='flex justify-center mt-2 items-center'>
        <button className='flex justify-center px-10 py-1 border rounded-3xl hover:border-black'>
          Join
        </button>
      </div>
    </div>
  );
};

export default Card;
