import { useState } from "react";
import Switch from "react-switch";
import { useDispatch } from "react-redux";
import { triggerSuccessAlert } from "../slices/alertSlice";
import moment from 'moment';


import { getEventFactoryContract } from '../../contracts/EventFactoryContractHelper';
import { parse18 } from '../../contracts/helpers.jsx';

export default function MintEvent() {
  const [state, setState] = useState([]);
  const [checked, setChecked] = useState(false);
  const [tested, setTested] = useState(false);
  const dispatch = useDispatch();

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const _handleChange = (nextChecked) => {
    setChecked(nextChecked);
  };

  const __handleChange = (nextTested) => {
    setTested(nextTested);
  };

  function handleEventMintBtn(){
    if(state.referrableNftPrice == undefined){
      mintNormalEvent()
    }else{
      mintReferabbleEvent()
    }
  }


  return (
    <div className='w-full'>
      <div className='mt-10'>
        <div className='h-[7em] flex flex-col items-center justify-center font-body text-white space-y-6'>
          <span className='text-3xl font-bold text-black'>Create Event</span>
          <p className='text-lg text-black'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis,
            repellat.
          </p>
        </div>
        <div className='px-4 mx-auto xl:container xl:px-20 md:px-12 font-body'>
          <div className='w-full p-6 mx-auto my-5 border sm:w-2/3 md:w-1/2 lg:w-2/5 rounded-2xl space-y-6'>
            <div className='space-y-2'>
              <p className='font-medium'>Enter your event name</p>
              <input
                type='text'
                className='w-full h-12 px-3 border rounded focus:outline-none'
                onChange={handleChange}
                name='eventName'
                placeholder='DeFi Night'
              />
            </div>

            <div className='space-y-2'>
              <p className='font-medium'>Enter your event description</p>
              <input
                type='text'
                className='w-full h-12 px-3 border rounded focus:outline-none'
                onChange={handleChange}
                name='eventDescription'
                placeholder='ArdMoney launchpad with community members'
              />
            </div>

            <div className='space-y-2'>
              <p className='font-medium'>Enter your event date</p>
              <input
                type='date'
                className='w-full h-12 px-3 border rounded focus:outline-none'
                onChange={handleChange}
                name='eventDate'
              />
            </div>

            <div className='space-y-2'>
              <p className='font-medium'>Enter your event location</p>
              <input
                type='text'
                className='w-full h-12 px-3 border rounded focus:outline-none'
                onChange={handleChange}
                name='eventLocation'
                placeholder='Central tower, Sukhbaatar District 14200 Ulaanbaatar, Mongolia'
              />
            </div>

            <div className='space-y-2'>
              <p className='font-medium'>
                Enter your event organizer social link
              </p>
              <input
                type='url'
                className='w-full h-12 px-3 border rounded focus:outline-none'
                onChange={handleChange}
                name='eventSocialLink'
                placeholder='https://www.facebook.com/'
              />
            </div>

            <div className='space-y-2'>
              <p className='font-medium'>Enter your event admin address</p>
              <input
                type='text'
                className='w-full h-12 px-3 border rounded focus:outline-none'
                onChange={handleChange}
                name='eventAdmin'
                placeholder='0x512...B0'
              />
            </div>

            <div className='space-y-2'>
              <p className='font-medium'>Enter your event nft ipfs url</p>
              <input
                type='url'
                className='w-full h-12 px-3 border rounded focus:outline-none'
                onChange={handleChange}
                name='ipfsUrl'
                placeholder='https://ipfs.tech/'
              />
            </div>

            <div className='space-y-2'>
              <p className='font-medium'>
                Do you want to switch event to nft event?
              </p>
            </div>
            <Switch
              onChange={_handleChange}
              checked={checked}
              className='react-switch'
            />
            {checked && (
              <div>
                <div className='space-y-2'>
                  <p className='font-medium'>Enter your price of event nft</p>
                  <input
                    type='text'
                    className='w-full h-12 px-3 border rounded focus:outline-none'
                    onChange={handleChange}
                    name='normalNftPrice'
                    placeholder='0.005ETH'
                  />
                </div>

                <div className='mt-6 space-y-2'>
                  <p className='font-medium'>Enter your event date</p>
                  <input
                    type='date'
                    className='w-full h-12 px-3 border rounded focus:outline-none'
                    onChange={handleChange}
                    name='normalNftDeadline'
                  />
                </div>

                <div className='mt-6 space-y-2'>
                  <p className='font-medium'>Enter your event nfts amount</p>
                  <input
                    type='text'
                    className='w-full h-12 px-3 border rounded focus:outline-none'
                    onChange={handleChange}
                    name='normalNftLimit'
                    placeholder='200 amount'
                  />
                </div>
              </div>
            )}
            <div className='space-y-2'>
              <p className='font-medium'>
                Do you want to add referrable nft feature to the event?
              </p>
            </div>

            <Switch
              onChange={__handleChange}
              checked={tested}
              className='react-switch'
            />
            {tested && (
              <div>
                <div className='mt-6 space-y-2'>
                  <p className='font-medium'>
                    Enter your price of event referrable nft
                  </p>
                  <input
                    type='text'
                    className='w-full h-12 px-3 border rounded focus:outline-none'
                    onChange={handleChange}
                    name='referrableNftPrice'
                    placeholder='0.005ETH'
                  />
                </div>

                <div className='mt-6 space-y-2'>
                  <p className='font-medium'>
                    Enter your referrable nft deadline
                  </p>
                  <input
                    type='date'
                    className='w-full h-12 px-3 border rounded focus:outline-none'
                    onChange={handleChange}
                    name='referrableNftDeadline'
                  />
                </div>

                <div className='mt-6 space-y-2'>
                  <p className='font-medium'>
                    Enter your referrable nfts amount
                  </p>
                  <input
                    type='text'
                    className='w-full h-12 px-3 border rounded focus:outline-none'
                    onChange={handleChange}
                    name='referrableNftLimit'
                    placeholder='200'
                  />
                </div>

                <div className='mt-6 space-y-2'>
                  <p className='font-medium'>
                    Enter your referrable nft referal limit
                  </p>
                  <input
                    type='text'
                    className='w-full h-12 px-3 border rounded focus:outline-none'
                    onChange={handleChange}
                    name='referrableNftReferralLimit'
                    placeholder='5'
                  />
                </div>
              </div>
            )}

            <div className='flex items-center justify-center w-full h-10 font-semibold text-white bg-blue-500 rounded cursor-pointer hover:bg-blue-600'>
              <button
                onClick={() => {
                  handleEventMintBtn()
                }}
              >
                Mint NFT Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  async function mintNormalEvent(){
    const { eventFactoryWriteContract } = await getEventFactoryContract()

    let eventDetail = [
      state.eventName,
      state.ipfsUrl,
      state.eventDescription,
      state.eventLocation,
      moment(state.eventDate).unix(),
      state.eventSocialLink,
      [state.eventAdmin]
    ]

    let eventNormal = [
      true,
      parse18(state.normalNftPrice),
      moment(state.normalNftDeadline).unix(),
      parseInt(state.normalNftLimit)
    ]

    dispatch(
      triggerSuccessAlert({
        content: "A successful event has been created.",
      })
    );
  }

  async function mintReferabbleEvent(){
    const { eventFactoryWriteContract } = await getEventFactoryContract()


    let eventDetail = [
      state.eventName,
      state.ipfsUrl,
      state.eventDescription,
      state.eventLocation,
      moment(state.eventDate).unix(),
      state.eventSocialLink,
      [state.eventAdmin]
    ]

    let eventNormal = [
      true,
      parse18(parseFloat(state.normalNftPrice)),
      moment(state.normalNftDeadline).unix(),
      parseInt(state.normalNftLimit)
    ]

    let eventReferrable = [
      true,
      parse18(parseFloat(state.referrableNftPrice)),
      moment(state.referrableNftDeadline).unix(),
      parseInt(state.referrableNftLimit),
      parseInt(state.referrableNftReferralLimit),
    ]

    console.log(eventDetail)
    console.log(eventNormal)
    console.log(eventReferrable)

    try {
      let tx = await eventFactoryWriteContract.createReferrableEvent(eventDetail,eventNormal,eventReferrable)
      await tx.wait()

      dispatch(
        triggerSuccessAlert({
          content: "A successful event has been created.",
        })
      );
    } catch (e) {
      console.log(e)
    }

  }
}
