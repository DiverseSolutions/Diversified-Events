import React from "react";
import { useState } from "react";

export default function OrganizerPage() {
  const [isTextHidden, setTextHidden] = useState(true);
  const [_isTextHidden, _setTextHidden] = useState(true);

  const onClick = () => setTextHidden(!isTextHidden);
  const _onClick = () => _setTextHidden(!_isTextHidden);

  return (
    <div className="flex w-full justify-center">
      <div>
        <div className="flex max-w-3xl w-full mt-10 mb-5 justify-center">
          <img
            className="border rounded-2xl"
            src="https://scontent.fuln6-2.fna.fbcdn.net/v/t39.30808-6/307863160_5456046154487122_5745433977868117992_n.jpg?stp=dst-jpg_p960x960&_nc_cat=105&ccb=1-7&_nc_sid=340051&_nc_ohc=P--xzGChOLEAX8r1Rfh&_nc_ht=scontent.fuln6-2.fna&oh=00_AT_fMo2XYYrc3I7aZAi7oe9w_5-wh2EQ1WDewyOFMRc8eg&oe=634826FB"
            alt=""
          />
        </div>
        <div>
          <span className="font-bold text-red-600">
            SATURDAY, OCTOBER 15, 2022 AT 4:30 PM UTC+08
          </span>
          <br />
          <span className="font-bold text-4xl">
            Advanced JavaScript Training
          </span>
          <br />
          <div className="flex justify-between">
            <span className="text-slate-600 text-xl">
              0.008 ETH - Paid Online Event
            </span>
          </div>

          <div className="border rounded-2xl my-5 p-6">
            <span className="font-bold text-2xl">Details</span> <br />
            <div className="mt-2">
              <div className="flex items-center gap-2">
                {" "}
                <svg width="1.8em" height="1.8em" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M9 13.75c-2.34 0-7 1.17-7 3.5V19h14v-1.75c0-2.33-4.66-3.5-7-3.5zM4.34 17c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25H4.34zM9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5S5.5 6.57 5.5 8.5S7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V19h4v-1.75c0-2.02-3.5-3.17-5.96-3.44zM15 12c1.93 0 3.5-1.57 3.5-3.5S16.93 5 15 5c-.54 0-1.04.13-1.5.35c.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35z"
                  ></path>
                </svg>
                <span className="text-xl">74 people joined</span>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <svg width="1.8em" height="1.8em" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M15.5 11.5c0 2-2.5 3.5-2.5 5h-2c0-1.5-2.5-3-2.5-5C8.5 9.57 10.07 8 12 8s3.5 1.57 3.5 3.5zm-2.5 6h-2V19h2v-1.5zm9-5.5c0-2.76-1.12-5.26-2.93-7.07l-1.06 1.06A8.481 8.481 0 0 1 20.5 12c0 2.34-.95 4.47-2.49 6.01l1.06 1.06A9.969 9.969 0 0 0 22 12zM3.5 12c0-2.34.95-4.47 2.49-6.01L4.93 4.93A9.969 9.969 0 0 0 2 12c0 2.76 1.12 5.26 2.93 7.07l1.06-1.06A8.481 8.481 0 0 1 3.5 12zm14 0c0 1.52-.62 2.89-1.61 3.89l1.06 1.06A6.976 6.976 0 0 0 19 12c0-1.93-.78-3.68-2.05-4.95l-1.06 1.06c.99 1 1.61 2.37 1.61 3.89zM7.05 16.95l1.06-1.06c-1-1-1.61-2.37-1.61-3.89s.62-2.89 1.61-3.89L7.05 7.05A6.976 6.976 0 0 0 5 12c0 1.93.78 3.68 2.05 4.95z"
                  ></path>
                </svg>
                <span className="text-xl">Online with google meet</span>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <svg width="1.8em" height="1.8em" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M17.06 11.57c.59-.69.94-1.59.94-2.57c0-1.86-1.27-3.43-3-3.87V3h-2v2h-2V3H9v2H6v2h2v10H6v2h3v2h2v-2h2v2h2v-2c2.21 0 4-1.79 4-4c0-1.45-.78-2.73-1.94-3.43zM10 7h4c1.1 0 2 .9 2 2s-.9 2-2 2h-4V7zm5 10h-5v-4h5c1.1 0 2 .9 2 2s-.9 2-2 2z"
                  ></path>
                </svg>
                <span className="text-xl">Purchase for 0.008 ETH</span>
              </div>
            </div>
            <div className="pt-2">
              <span className="font-bold text-2xl">Introduction</span> <br />
              <div className="pt-2 text-xl">
                <span>Complete JavaScript syllabus to learn</span> <br />
                <span>Basic JavaScript Introduction</span> <br />
                <span>What is JavaScript?</span> <br />
                <span>Evolution of JavaScript</span> <br />
                <span>Features of JavaScript</span> <br />
                <span>Advantages and Disadvantages of JavaScript</span> <br />
                <span>How does JavaScript works?</span> <br />
                <span>Structure of a JavaScript program</span> <br />
                <span>
                  How to write JavaScript in Notepad++, Visual Studio Code
                </span>{" "}
                <br />
                <span>How to add JavaScript in HTML?</span> <br />
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <div>
              <button
                className="flex justify-center text-white bg-blue-600 px-10 py-1 mb-3 border rounded-3xl hover:border-black"
                onClick={onClick}
              >
                {isTextHidden ? "Buy referralbe nft ticket" : "Close"}
              </button>
              {!isTextHidden ? (
                <div className="border rounded-2xl my-5 p-6 max-w-[15rem]">
                  <span className="text-lg">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                    non explicabo ex quibusdam, doloribus cum quo? Corrupti
                    fugit doloribus impedit.
                  </span>
                  <button className="flex justify-center text-white bg-blue-600 px-10 my-2 py-1 border rounded-3xl hover:border-black">
                    Join
                  </button>
                </div>
              ) : null}
            </div>
            <div>
              <button
                className="flex justify-center text-white bg-blue-600 px-10 py-1 mb-3 border rounded-3xl hover:border-black"
                onClick={_onClick}
              >
                {_isTextHidden ? "Buy normal nft ticket" : "Close"}
              </button>
              {!_isTextHidden ? (
                <div className="border rounded-2xl my-5 p-6 max-w-[15rem]">
                  <span className="text-lg">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Temporibus a accusamus dicta animi rem, vitae laborum ad
                    voluptas tenetur eos?
                  </span>
                  <button className="flex justify-center text-white bg-blue-600 px-10 py-1 mt-2 border rounded-3xl hover:border-black">
                    Join
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
