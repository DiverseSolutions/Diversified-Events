import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { triggerSuccessAlert } from "../slices/alertSlice";
import { getOrganizerFactoryContract } from "../../contracts/OrganizerContractHelper";

export default function OrganizerForm() {
  const [data, setData] = useState([]);
  const [userNameInput, setUserName] = useState("");
  const [userLinkedinInput, setLinkedin] = useState("");
  const [userEmailInput, setEmail] = useState("");
  const [state, setState] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    createOrganizer();
  }, []);

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function createOrganizer() {
    try {
      let { organizerReadContract, organizerWriteContract } =
        await getOrganizerFactoryContract();

      const tx = await organizerWriteContract.createOrganizer(
        data._username,
        data._linkedIn,
        data._email
      );

      await tx.wait()

      dispatch(
        triggerSuccessAlert({ content: "Success Organizer NFT" })
      );
    } catch (err) {
      console.log("err: ", err);
    }
  }

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
                onClick={() => { createOrganizer() }}
              >
                Mint Event Organizer NFT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
