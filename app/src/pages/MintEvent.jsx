import React from "react";
import { useState } from "react";
import Switch from "react-switch";

export default function MintEvent() {
  const [state, setState] = useState([]);

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  function handleSubmit() {
    console.log("state: ", state);
  }

  return (
    <div className="w-full">
      <div className="mt-10">
        <div className="h-[7em] flex flex-col items-center justify-center font-body text-white space-y-6">
          <span className="text-3xl font-bold text-black">Create Event</span>
          <p className="text-lg text-black">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis,
            repellat.
          </p>
        </div>
        <div className="xl:container mx-auto xl:px-20 md:px-12 px-4 font-body">
          <div className="w-full sm:w-2/3 md:w-1/2 lg:w-2/5 mx-auto border rounded-2xl my-5 p-6 space-y-6">
            <div className="space-y-2">
              <p className="font-medium">Enter your event name</p>
              <input
                type="text"
                className="border rounded w-full h-12 px-3 focus:outline-none"
                onChange={handleChange}
                name="eventName"
                placeholder="DeFi Night"
              />
            </div>
            <div className="space-y-2">
              <p className="font-medium">Enter your event description</p>
              <input
                type="text"
                className="border rounded w-full h-12 px-3 focus:outline-none"
                onChange={handleChange}
                name="eventDescription"
                placeholder="ArdMoney launchpad with community members"
              />
            </div>
            <div className="space-y-2">
              <p className="font-medium">Enter your event date</p>
              <input
                type="date"
                className="border rounded w-full h-12 px-3 focus:outline-none"
                onChange={handleChange}
                name="eventDate"
              />
            </div>
            <div className="space-y-2">
              <p className="font-medium">Enter your event location</p>
              <input
                type="text"
                className="border rounded w-full h-12 px-3 focus:outline-none"
                onChange={handleChange}
                name="eventLocation"
                placeholder="Central tower, Sukhbaatar District 14200 Ulaanbaatar, Mongolia"
              />
            </div>
            <div className="space-y-2">
              <p className="font-medium">
                Enter your event organizer social link
              </p>
              <input
                type="url"
                className="border rounded w-full h-12 px-3 focus:outline-none"
                onChange={handleChange}
                name="eventSocialLink"
                placeholder="https://www.facebook.com/"
              />
            </div>
            <div className="space-y-2">
              <p className="font-medium">Enter your event admin address</p>
              <input
                type="text"
                className="border rounded w-full h-12 px-3 focus:outline-none"
                onChange={handleChange}
                name="eventAdmin"
                placeholder="0x512...B0"
              />
            </div>
            <div className="space-y-2">
              <p className="font-medium">Enter your event nft ipfs url</p>
              <input
                type="url"
                className="border rounded w-full h-12 px-3 focus:outline-none"
                onChange={handleChange}
                name="ipfsUrl"
                placeholder="https://ipfs.tech/"
              />
            </div>

            <div className="w-full flex justify-center items-center rounded bg-blue-500 hover:bg-blue-600 cursor-pointer h-10 font-semibold text-white">
              <button onClick={() => {}}>Mint Event NFT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
