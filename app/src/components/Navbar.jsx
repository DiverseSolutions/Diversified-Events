import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const history = useNavigate();
  return (
    <div className='flex h-[70px] justify-center items-center border-b border-t w-full'>
      <div className='flex items-center justify-between max-w-5xl w-full'>
        <span
          className='font-medium text-lg cursor-pointer'
          onClick={() => history("/")}
        >
          Diversified Events
        </span>
        <div className='flex items-center gap-2'>
          <button className='px-5 py-2 border rounded-3xl hover:border-black'>
            Connect wallet
          </button>
          <button className='p-2 border rounded-full hover:border-black'>
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
  );
};

export default Navbar;
