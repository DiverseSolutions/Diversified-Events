import React from "react";
import CardDetails from "../../dummyData/CardDetail";

const CardDetail = () => {
  return (
    <>
      {CardDetails.map((data) => (
        <div className="flex flex-col w-full p-5 border rounded-2xl mt-4 gap-2 hover:border-black cursor-pointer">
          <div className="flex justify-between">
            <div>
              <span className="text-gray-700 text-sm">{`${data.address.substring(
                0,
                6
              )}...${data.address.substring(data.address.length - 4)}`}</span>
            </div>
            <span className="px-3 py-1 rounded-2xl bg-blue-700 text-white text-sm">
              {data.status}
            </span>
          </div>
          <span className="font-bold text-xl">{data.title}</span>
          <span className="text-gray-700 font-medium">{data.description}</span>
          <div className="w-full rounded-xl">
            <img src={data.image} alt="" className="rounded-xl" />
          </div>
          <div className="flex justify-between">
            <span>
              <span className="font-semibold">Date:</span> {data.date}
            </span>
            <span>
              <span className="font-semibold">Sold:</span> {data.soldCount}{" "}
              tickets
            </span>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardDetail;
