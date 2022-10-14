import { useState, useEffect } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getEventContract } from "../../contracts/EventContractHelper";
import moment from "moment";
import { BigNumber } from "ethers";
import MintEvent from "../pages/MintEvent";

const EventCard = (props) => {
  const navigate = useNavigate();
  const { data, index } = props;

  async function mintAccessNft() {
    const { eventWriteContract } = await getEventContract(data.eventAddress);
    const accessNftDetails = await eventWriteContract.eventNftDetails();
    const nftPrice = accessNftDetails.price;
    let tx = await eventWriteContract.mint({
      value: nftPrice,
    });
    await tx.wait();
  }

  return (
    <div
      className='flex flex-col justify-center text-center border rounded-2xl h-full p-5 cursor-pointer select-none'
      key={index}
    >
      <div className='w-full flex justify-center'>
        <img
          src={data.eventDetails?.profile ?? ""}
          width={"80px"}
          height={"80px"}
          alt='Event Image'
          className='flex justify-center text-center rounded-2xl'
        />
      </div>
      <div className='flex flex-col my-2'>
        <span className='font-medium text-lg'>
          {data.eventDetails?.name ?? ""}
        </span>
        <span className='text-sm font-semibold'>
          {data.eventDetails?.description ?? ""}
        </span>
      </div>
      <div className='flex flex-col gap-1'>
        <span>
          <span className='font-semibold'>Social Link: </span>
          {data.eventDetails?.socialLink ?? ""}
        </span>
        <span>
          <span className='font-semibold'>Date: </span>{" "}
          {moment(data.eventDetails.date.toNumber() * 1000).format("lll")}
        </span>
      </div>
      <div className='flex justify-center mt-5 items-center'>
        <button
          className='flex justify-center px-10 py-1 border rounded-3xl hover:border-black'
          onClick={() => mintAccessNft()}
        >
          Mint
        </button>
      </div>
    </div>
  );
};

export default EventCard;
