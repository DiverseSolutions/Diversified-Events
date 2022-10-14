import { useState } from "react";
import Switch from "react-switch";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { triggerSuccessAlert, triggerInfoAlert } from "../slices/alertSlice";
import moment from "moment";

import { getEventFactoryContract } from "../../contracts/EventFactoryContractHelper";
import { parse18 } from "../../contracts/helpers.jsx";

export default function MintEvent() {
  const [state, setState] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disableLoaderBtn, setDisableLoaderBtn] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  async function handleEventMintBtn() {
    try {
      await mintReferabbleEvent();
    } catch (err) {
      dispatch(triggerInfoAlert({ content: "Please enter event details" }));
    }
  }

  return (
    <div className='w-full p-5 lg:p-3'>
      <div className='mt-10'>
        <div className='flex flex-col items-center justify-center font-body text-white space-y-6'>
          <span className='flex text-center text-3xl font-bold text-black'>
            Create Event
          </span>
          <span className='text-center text-lg text-black'>
            Create your event and create your event NFT
          </span>
        </div>
        <div className='font-body'>
          <div className='w-full p-6 mx-auto my-5 border rounded-2xl space-y-6 sm:w-4/5 lg:w-1/2'>
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
              <p className='font-medium'>Enter your event image poster uri</p>
              <input
                type='url'
                className='w-full h-12 px-3 border rounded focus:outline-none'
                onChange={handleChange}
                name='ipfsUrl'
                placeholder='https://ipfs.tech/'
              />
            </div>

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
                  placeholder='100 KLAY'
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
                <p className='font-medium'>Enter your referrable nfts amount</p>
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

            <button
              className={`w-full flex justify-center items-center rounded ${
                disableLoaderBtn
                  ? "bg-gray-500"
                  : "bg-blue-500 hover:bg-blue-600"
              } cursor-pointer h-10 font-semibold text-white`}
              onClick={() => {
                handleEventMintBtn();
              }}
              disabled={disableLoaderBtn ? true : false}
            >
              <div className='flex items-center'>
                {loading ? (
                  <svg
                    className={`inline mr-2 w-5 h-5 ${
                      disableLoaderBtn
                        ? "fill-black"
                        : "text-blue-400 fill-white"
                    }  animate-spin `}
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
                <span>Mint NFT Event</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  async function mintReferabbleEvent() {
    const { eventFactoryWriteContract } = await getEventFactoryContract();

    let eventDetail = [
      state.eventName,
      state.ipfsUrl,
      state.eventDescription,
      state.eventLocation,
      moment(state.eventDate).unix(),
      state.eventSocialLink,
      [state.eventAdmin],
    ];

    let nftDetails = [
      parse18(parseFloat(state.referrableNftPrice)),
      moment(state.referrableNftDeadline).unix(),
      parseInt(state.referrableNftLimit),
      parseInt(state.referrableNftReferralLimit),
    ];

    try {
      setDisableLoaderBtn(true);
      setLoading(true);
      let tx = await eventFactoryWriteContract.createEvent(
        eventDetail,
        nftDetails
      );
      await tx.wait();

      dispatch(
        triggerSuccessAlert({
          content: "A successful event has been created.",
        })
      );
      setLoading(false);
      setDisableLoaderBtn(false);
      navigate("/");
      navigate(0);
    } catch (e) {
      console.log(e);
    }
  }
}
