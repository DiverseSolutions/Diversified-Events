import React from "react";
import { useState } from "react";

export default function MintEvent() {
  const [userNameInput, setUserName] = useState("");
  const [userLinkedinInput, setLinkedin] = useState("");
  const [userEmailInput, setEmail] = useState("");
  return (
    <div className="w-full">
      <div className="mt-10">
        <div className="h-[7em] flex flex-col items-center justify-center font-body text-white space-y-6">
          <span className="text-3xl font-bold text-black">
            Become Event Organizer
          </span>

          <p className="text-lg text-black">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis,
            repellat.
          </p>
        </div>
        <div className="xl:container mx-auto xl:px-20 md:px-12 px-4 font-body">
          <div className="w-full sm:w-2/3 md:w-1/2 lg:w-2/5 mx-auto border rounded-2xl my-5 p-6 space-y-6">
            <div className="space-y-2">
              <p className="font-medium">Enter your name</p>
              <input
                type="text"
                className="border rounded w-full h-12 px-3 focus:outline-none"
                placeholder="Chingun Amarbaatar"
                onChange={(e) => {}}
              />
            </div>
            <div className="space-y-2">
              <p className="font-medium">Enter your e-mail</p>
              <input
                className="border rounded w-full h-12 px-3 focus:outline-none"
                type="email"
                placeholder="chingunee.dev@gmail.com"
                onChange={(e) => {}}
              />
            </div>
            <div className="space-y-2">
              <p className="font-medium">Enter your name</p>
              <input
                className="border rounded w-full h-12 px-3 focus:outline-none"
                type="url"
                placeholder="www.linkedin.com/in/chingunee"
                onChange={(e) => {}}
              />
            </div>
            <div className="w-full flex justify-center items-center rounded bg-blue-500 hover:bg-blue-600 cursor-pointer h-10 font-semibold text-white">
              <button onClick={() => {}}>Mint Event Organizer NFT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
