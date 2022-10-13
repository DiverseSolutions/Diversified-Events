import { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showConnectWalletModal } from "../slices/modalSlice";
import Dropdown from "./Dropdown";
import Logo from "../../assets/logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const metamask = useSelector((state) => state.metamask);
  const app = useSelector((state) => state.app);

  return (
    <div className='flex flex-col md:flex-row h-[70px] justify-center items-center border-b border-t w-full'>
      <div className='flex items-center justify-between px-3 sm:px-8 lg:5 xl:px-1 max-w-5xl w-full'>
        <div className='flex items-center gap-3 select-none'>
          <img
            src={Logo}
            width={"40px"}
            height={"40px"}
            alt='Diversified Logo'
            className='md:hidden mt-3 mb-[13px]'
            onClick={() => navigate("/")}
          />
          <span
            className='font-medium text-md sm:text-lg cursor-pointer select-none'
            onClick={() => navigate("/")}
          >
            Diversified Events
          </span>
        </div>
        <div className='md:hidden' onClick={() => setOpen(!open)}>
          <svg width='2em' height='2em' viewBox='0 0 24 24'>
            <path
              fill='currentColor'
              d='M4 18q-.425 0-.712-.288Q3 17.425 3 17t.288-.712Q3.575 16 4 16h16q.425 0 .712.288q.288.287.288.712t-.288.712Q20.425 18 20 18Zm0-5q-.425 0-.712-.288Q3 12.425 3 12t.288-.713Q3.575 11 4 11h16q.425 0 .712.287q.288.288.288.713t-.288.712Q20.425 13 20 13Zm0-5q-.425 0-.712-.287Q3 7.425 3 7t.288-.713Q3.575 6 4 6h16q.425 0 .712.287Q21 6.575 21 7t-.288.713Q20.425 8 20 8Z'
            ></path>
          </svg>
        </div>

        <div className='hidden md:flex items-center gap-2'>
          <button
            className='flex gap-2 items-center px-5 py-3 border rounded-3xl hover:border-black text-gray-500 font-semibold'
            onClick={() => {
              if (!metamask.isConnected) dispatch(showConnectWalletModal());
            }}
          >
            {metamask && metamask.isConnected ? (
              <div className='flex items-center gap-2 select-none'>
                <img
                  src='https://cdn.stamp.fyi/avatar/eth:0x1Fd9afb27FF1194b92C80eDA157C7eAC4C509F33?s=36'
                  alt=''
                  width={"20px"}
                  height={"20px"}
                  className='rounded-full'
                />
                {metamask.selectedAccount.substring(0, 6)}...
                {metamask.selectedAccount.substring(
                  metamask.selectedAccount.length - 4
                )}
              </div>
            ) : (
              "Connect wallet"
            )}
          </button>
          <div className='justify-center hidden'>
            <Dropdown />
          </div>
        </div>
      </div>

      {open && (
        <div className='absolute top-[70px] w-full border bg-white rounded-lg z-50'>
          <ul className='flex flex-col rounded-lg w-full '>
            <li
              className={`flex items-center w-full px-4 py-3 border-transparent rounded-lg cursor-pointer hover:bg-blue-100 hover:text-blue-800 gap-2`}
              onClick={() => {
                navigate("/");
                setOpen(false);
              }}
            >
              <svg width='1.2em' height='1.2em' viewBox='0 0 24 24'>
                <path
                  fill='currentColor'
                  d='M10.95 18.35L7.4 14.8l1.45-1.45l2.1 2.1l4.2-4.2l1.45 1.45ZM5 22q-.825 0-1.413-.587Q3 20.825 3 20V6q0-.825.587-1.412Q4.175 4 5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588Q21 5.175 21 6v14q0 .825-.587 1.413Q19.825 22 19 22Zm0-2h14V10H5v10Z'
                ></path>
              </svg>
              <span>All Events</span>
            </li>
            {!app.isOrganizer && (
              <li
                className={`flex items-center w-full px-4 py-3 border-transparent rounded-lg cursor-pointer hover:bg-blue-100 hover:text-blue-800 gap-2`}
                onClick={() => {
                  navigate("/organizer-form");
                  setOpen(false);
                }}
              >
                <svg width='1.2em' height='1.2em' viewBox='0 0 24 24'>
                  <path
                    fill='currentColor'
                    d='m2 19.99l7.5-7.51l4 4l7.09-7.97L22 9.92l-8.5 9.56l-4-4l-6 6.01l-1.5-1.5zm1.5-4.5l6-6.01l4 4L22 3.92l-1.41-1.41l-7.09 7.97l-4-4L2 13.99l1.5 1.5z'
                  ></path>
                </svg>
                <span>Become organizer</span>
              </li>
            )}
            {!app.isOrganizer && (
              <li
                className={`flex items-center w-full px-4 py-3 border-transparent rounded-lg cursor-pointer hover:bg-blue-100 hover:text-blue-800 gap-2`}
                onClick={() => {
                  navigate("/mint-event");
                  setOpen(false);
                }}
              >
                <svg width='1.2em' height='1.2em' viewBox='0 0 256 256'>
                  <path
                    fill='currentColor'
                    d='M228 128a12 12 0 0 1-12 12h-76v76a12 12 0 0 1-24 0v-76H40a12 12 0 0 1 0-24h76V40a12 12 0 0 1 24 0v76h76a12 12 0 0 1 12 12Z'
                  ></path>
                </svg>
                <span>Create event</span>
              </li>
            )}
            <li
              className={`flex items-center w-full px-4 py-3 border-transparent rounded-lg cursor-pointer hover:bg-blue-100 hover:text-blue-800 gap-2`}
              onClick={() => {
                navigate("/my-events");
                setOpen(false);
              }}
            >
              <svg width='1.2em' height='1.2em' viewBox='0 0 24 24'>
                <path
                  fill='currentColor'
                  d='M5 17q-.825 0-1.413-.587Q3 15.825 3 15V9q0-.825.587-1.413Q4.175 7 5 7h14q.825 0 1.413.587Q21 8.175 21 9v6q0 .825-.587 1.413Q19.825 17 19 17Zm0-2h14V9H5v6ZM3 5V3h18v2Zm0 16v-2h18v2ZM5 9v6v-6Z'
                ></path>
              </svg>
              <span>My Events</span>
            </li>
            <li
              className={`flex items-center w-full px-4 py-3 border-transparent rounded-lg cursor-pointer  hover:bg-blue-100 hover:text-blue-800 gap-2`}
              onClick={() => {
                navigate("/my-nfts");
                setOpen(false);
              }}
            >
              <svg width='1.2em' height='1.2em' viewBox='0 0 24 24'>
                <path
                  fill='currentColor'
                  d='M18 4H6C3.79 4 2 5.79 2 8v8c0 2.21 1.79 4 4 4h12c2.21 0 4-1.79 4-4V8c0-2.21-1.79-4-4-4zm-1.86 9.77c-.24.2-.57.28-.88.2L4.15 11.25C4.45 10.52 5.16 10 6 10h12c.67 0 1.26.34 1.63.84l-3.49 2.93zM6 6h12c1.1 0 2 .9 2 2v.55c-.59-.34-1.27-.55-2-.55H6c-.73 0-1.41.21-2 .55V8c0-1.1.9-2 2-2z'
                ></path>
              </svg>
              <span>My NFTs</span>
            </li>
            <li
              className={`flex items-center w-full px-4 py-3 border-transparent rounded-lg cursor-pointer hover:bg-blue-100 hover:text-blue-800 gap-2`}
              onClick={() => {
                navigate("/verify-nfts");
                setOpen(false);
              }}
            >
              <svg width='1.2em' height='1.2em' viewBox='0 0 24 24'>
                <path
                  fill='currentColor'
                  d='M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4l1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z'
                ></path>
              </svg>
              <span>Verify NFTs</span>
            </li>
          </ul>
          {metamask && metamask.isConnected ? (
            <div className='flex justify-center w-full gap-2 items-center px-5 py-4 border-b border-t text-gray-500 font-semibold'>
              <div className='flex items-center gap-2 select-none'>
                <img
                  src='https://cdn.stamp.fyi/avatar/eth:0x1Fd9afb27FF1194b92C80eDA157C7eAC4C509F33?s=36'
                  alt=''
                  width={"20px"}
                  height={"20px"}
                  className='rounded-full'
                />
                {metamask.selectedAccount.substring(0, 6)}...
                {metamask.selectedAccount.substring(
                  metamask.selectedAccount.length - 4
                )}
              </div>
            </div>
          ) : (
            "Connect wallet"
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
