import React from "react";
import Logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  let navigate = useNavigate();

  return (
    <div className="w-[200px] h-full border flex flex-col items-center gap-4 cursor-pointer">
      <img
        src={Logo}
        width={"42px"}
        height={"42px"}
        alt="Diversified Logo"
        className="mt-3 mr-[120px]"
        onClick={() => navigate("/")}
      />
      <div
        className="p-3 border-transparent rounded-full hover:bg-blue-100 hover:text-blue-800 cursor-pointer flex gap-2"
        onClick={() => navigate("/organizer-form")}
      >
        <svg width="1.5em" height="1.5em" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="m2 19.99l7.5-7.51l4 4l7.09-7.97L22 9.92l-8.5 9.56l-4-4l-6 6.01l-1.5-1.5zm1.5-4.5l6-6.01l4 4L22 3.92l-1.41-1.41l-7.09 7.97l-4-4L2 13.99l1.5 1.5z"
          ></path>
        </svg>
        <span>Become organizer</span>
      </div>
      <div
        className="border-transparent rounded-full py-3 pr-[50px] pl-3 flex gap-2 hover:bg-blue-100 hover:text-blue-800 cursor-pointer"
        onClick={() => navigate("/mint-event")}
      >
        <svg
          width="1.5em"
          height="1.5em"
          viewBox="0 0 256 256"
          onClick={() => navigate("/mint-event")}
        >
          <path
            fill="currentColor"
            d="M228 128a12 12 0 0 1-12 12h-76v76a12 12 0 0 1-24 0v-76H40a12 12 0 0 1 0-24h76V40a12 12 0 0 1 24 0v76h76a12 12 0 0 1 12 12Z"
          ></path>
        </svg>
        <span>Create event</span>
      </div>
    </div>
  );
};

export default Sidebar;
