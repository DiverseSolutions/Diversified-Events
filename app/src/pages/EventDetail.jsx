import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { ethers } from "ethers";
import moment from "moment";
import { toFloat18 } from "../../contracts/helpers";

export default function OrganizerPage(props) {
  const [isTextHidden, setTextHidden] = useState(true);
  const [_isTextHidden, _setTextHidden] = useState(true);

  const onClick = () => setTextHidden(!isTextHidden);
  const _onClick = () => _setTextHidden(!_isTextHidden);

  const location = useLocation();
  const data = location.state;

  // console.log(
  //   "dat: ",
  //   moment(data.eventDetails.date.toNumber() * 1000).format("lll")
  // );
  // ethers.utils.parseEther(ethers.utils.formatUnits(data.eventNftDetails.price, 18))

  return (
    <div className='flex justify-center text-center h-full cursor-pointer select-none'>
      <div className='flex flex-col w-full max-w-3xl mt-10'>
        <img
          src={data.eventDetails?.profile ?? ""}
          alt='Event Image'
          className='flex justify-center text-center rounded-2xl'
        />
        <div className='flex gap-2 mt-5'>
          <div className='flex flex-col'>
            <span>{data.eventDetails?.name ?? ""}</span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
