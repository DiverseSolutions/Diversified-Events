import React from "react";
import VerifyNftCard from "../components/VerifyNftCard";
import EventCardData from "../../dummyData/EventCardData";

export default function VerifyNfts() {
  return (
    <div className="min-h-screen w-full flex justify-center mt-10">
      <div className="flex max-w-5xl justify-center">
        <div className="grid grid-cols-3 gap-3 w-full h-64">
          {EventCardData.map((data, index) => (
            <VerifyNftCard key={index} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
}
