import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { triggerSuccessAlert } from "../slices/alertSlice";
import { getOrganizerFactoryContract } from "../../contracts/OrganizerContractHelper";

export default function OrganizerForm() {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  async function createOrganizer() {
    try {
      setLoading(true);
      let { organizerReadContract, organizerWriteContract } =
        await getOrganizerFactoryContract();
      const tx = await organizerWriteContract.createOrganizer(
        state._username,
        state._linkedIn,
        state._email
      );

      await tx.wait();
      dispatch(triggerSuccessAlert({ content: "Success Organizer NFT" }));
      setLoading(false);
    } catch (err) {
      console.log("err: ", err);
    }
  }

  console.log("loading: ", loading);

  return (
    <div className='w-full'>
      <div className='mt-10'>
        <div className='h-[7em] flex flex-col items-center justify-center font-body text-white space-y-6'>
          <span className='text-3xl font-bold text-black'>
            Become Event Organizer
          </span>

          <p className='text-lg text-black'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis,
            repellat.
          </p>
        </div>
        <div className='xl:container mx-auto xl:px-20 md:px-12 px-4 font-body'>
          <div className='w-full sm:w-2/3 md:w-1/2 lg:w-2/5 mx-auto border rounded-2xl my-5 p-6 space-y-6'>
            <div className='space-y-2'>
              <p className='font-medium'>Enter your name</p>
              <input
                name='_username'
                type='text'
                className='border rounded w-full h-12 px-3 focus:outline-none'
                placeholder='Chingun Amarbaatar'
                onChange={handleChange}
              />
            </div>
            <div className='space-y-2'>
              <p className='font-medium'>Enter your e-mail</p>
              <input
                name='_email'
                className='border rounded w-full h-12 px-3 focus:outline-none'
                type='email'
                placeholder='chingunee.dev@gmail.com'
                onChange={handleChange}
              />
            </div>
            <div className='space-y-2'>
              <p className='font-medium'>Enter your linkedin</p>
              <input
                name='_linkedIn'
                className='border rounded w-full h-12 px-3 focus:outline-none'
                type='url'
                placeholder='www.linkedin.com/in/chingunee'
                onChange={handleChange}
              />
            </div>
            <div className='w-full flex justify-center items-center rounded bg-blue-500 hover:bg-blue-600 cursor-pointer h-10 font-semibold text-white'>
              <button
                onClick={() => {
                  createOrganizer();
                }}
                className='flex items-center'
              >
                {loading ? (
                  <svg
                    class='inline mr-2 w-5 h-5 text-blue-400 animate-spin fill-white'
                    viewBox='0 0 100 101'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                      fill='currentColor'
                    />
                    <path
                      d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                      fill='currentFill'
                    />
                  </svg>
                ) : (
                  ""
                )}
                <span>Mint Event Organizer NFT</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
