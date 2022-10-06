import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showConnectWalletModal } from "../slices/modalSlice";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const metamask = useSelector((state) => state.metamask);

  console.log("acc: ", metamask.selectedAccount);

  return (
    <div className='flex h-[70px] justify-center items-center border-b border-t w-full'>
      <div className='flex items-center justify-between max-w-5xl w-full'>
        <span
          className='font-medium text-lg cursor-pointer'
          onClick={() => navigate("/")}
        >
          Diversified Events
        </span>
        <div className='flex items-center gap-2'>
          <button
            className='flex gap-2 items-center px-5 py-2 border rounded-3xl hover:border-black text-gray-500 font-semibold'
            onClick={() => {
              if (!metamask.isConnected) dispatch(showConnectWalletModal());
            }}
          >
            {metamask && metamask.isConnected ? (
              <div className='flex items-center gap-2'>
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
          <div className='flex justify-center'>
            <button
              className='flex p-2 border rounded-full hover:border-black gap-2'
              onClick={() => setOpen(!open)}
              type='button'
              id='dropdownMenuButton1'
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              <svg width='1.5em' height='1.5em' viewBox='0 0 24 24'>
                <path
                  fill='currentColor'
                  d='M16 12a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2m-6 0a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2m-6 0a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2Z'
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
