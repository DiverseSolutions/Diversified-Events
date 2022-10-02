import React from "react";

const Navbar = () => {
  return (
    <div className='flex h-[70px] items-center justify-around border-b border-t'>
      <span className='font-medium text-lg cursor-pointer'>
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
  );
};

export default Navbar;
