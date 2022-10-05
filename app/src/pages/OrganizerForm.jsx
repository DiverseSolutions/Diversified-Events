import React from "react";
import { useState } from "react";

export default function OrganizerForm() {
  const [userNameInput, setUserName] = useState("");
  const [userLinkedinInput, setLinkedin] = useState("");
  const [userEmailInput, setEmail] = useState("");

  return (
    <div className="flex w-full justify-center">
      <div>
        <div className="flex max-w-3xl w-full mt-10 mb-5 justify-center">
          <img
            src="https://images.pexels.com/photos/1422032/pexels-photo-1422032.jpeg?cs=srgb&dl=pexels-jess-bailey-designs-1422032.jpg&fm=jpg"
            alt=""
          />
        </div>
        <div className="pt-5">
          <span className="font-bold text-4xl">Become Event Organizer</span>
          <br />
          <div className="border rounded-2xl my-5 p-6">
            <span className="font-semibold text-2xl">Enter your name:</span>{" "}
            <br />
            <input
              type="text"
              className="border rounded w-full h-9 my-2"
              placeholder=" Chingun"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              value={userNameInput}
            />
            <span className="font-semibold text-2xl">Enter your e-mail:</span>{" "}
            <br />
            <input
              type="text"
              className="border rounded w-full h-9 my-2"
              placeholder=" chingunee.dev@gmail.com"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={userEmailInput}
            />
            <span className="font-semibold text-2xl">Enter your linkedin:</span>{" "}
            <br />
            <input
              type="text"
              className="border rounded w-full h-9 my-2"
              placeholder=" www.linkedin.com/in/chingunee"
              onChange={(e) => {
                setLinkedin(e.target.value);
              }}
              value={userLinkedinInput}
            />
            <div className="flex justify-center text-white bg-blue-600 px-10 py-1 mt-2 border rounded-3xl hover:border-black w-3">
              <button onClick={() => {}}>Mint</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
