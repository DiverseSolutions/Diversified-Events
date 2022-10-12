import React from "react";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const Sidebar = () => {
  let navigate = useNavigate();
  const app = useSelector((state) => state.app);

  return (
    <div className='w-[240px] h-full border flex flex-col items-center cursor-pointer '>
      <div className='flex items-center justify-center w-full'>
        <img
          src={Logo}
          width={"42px"}
          height={"42px"}
          alt='Diversified Logo'
          className='mt-3 mb-[13px]'
          onClick={() => navigate("/")}
        />
      </div>
      <div className='w-full h-[1px] bg-[#e5e7eb]'></div>
      <div className='flex flex-col w-full px-2 mt-4 select-none gap-2 text-md'>
        <div
          className='flex items-center w-full px-4 py-2 border-transparent rounded-lg cursor-pointer hover:bg-blue-100 hover:text-blue-800 gap-2'
          onClick={() => navigate("/")}
        >
          <svg width='1.2em' height='1.2em' viewBox='0 0 24 24'>
            <path
              fill='currentColor'
              d='M10.95 18.35L7.4 14.8l1.45-1.45l2.1 2.1l4.2-4.2l1.45 1.45ZM5 22q-.825 0-1.413-.587Q3 20.825 3 20V6q0-.825.587-1.412Q4.175 4 5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588Q21 5.175 21 6v14q0 .825-.587 1.413Q19.825 22 19 22Zm0-2h14V10H5v10Z'
            ></path>
          </svg>
          <span>All Events</span>
        </div>
        { !app.isOrganizer && (
          <div
            className='flex items-center w-full px-4 py-2 border-transparent rounded-lg cursor-pointer hover:bg-blue-100 hover:text-blue-800 gap-2'
            onClick={() => navigate("/organizer-form")}
          >
            <svg width='1.2em' height='1.2em' viewBox='0 0 24 24'>
              <path
                fill='currentColor'
                d='m2 19.99l7.5-7.51l4 4l7.09-7.97L22 9.92l-8.5 9.56l-4-4l-6 6.01l-1.5-1.5zm1.5-4.5l6-6.01l4 4L22 3.92l-1.41-1.41l-7.09 7.97l-4-4L2 13.99l1.5 1.5z'
              ></path>
            </svg>
            <span>Become organizer</span>
          </div>
        ) }
        { app.isOrganizer && (
        <div
          className='flex items-center w-full px-4 py-2 border-transparent rounded-lg cursor-pointer hover:bg-blue-100 hover:text-blue-800 gap-2'
          onClick={() => navigate("/mint-event")}
        >
          <svg width='1.2em' height='1.2em' viewBox='0 0 256 256'>
            <path
              fill='currentColor'
              d='M228 128a12 12 0 0 1-12 12h-76v76a12 12 0 0 1-24 0v-76H40a12 12 0 0 1 0-24h76V40a12 12 0 0 1 24 0v76h76a12 12 0 0 1 12 12Z'
            ></path>
          </svg>
          <span>Create event</span>
        </div>
        ) }
      </div>
    </div>
  );
};

export default Sidebar;
