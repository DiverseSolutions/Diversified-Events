import moment from "moment";
import { useDispatch } from "react-redux";
import { showQrModal } from "../slices/modalSlice";

const EventCardNft = (props) => {
  const dispatch = useDispatch();
  const { data } = props;

  return (
    <div className='flex flex-col h-full p-5 border rounded-2xl justify-between'>
      <div className='flex flex-col justify-start text-center  h-full  cursor-pointer select-none'>
        <div className='w-full flex justify-center'>
          <img
            src={data.eventDetails?.profile ?? ""}
            width={"100%"}
            alt='Event Image'
            className='flex justify-center text-center rounded-2xl'
          />
        </div>

        <div className='flex flex-col my-2'>
          <span className='font-medium text-lg break-all'>
            {data.eventDetails?.name ?? ""}
          </span>
          <span className='text-sm font-normal '>
            {data.eventDetails?.description.length > 50
              ? data.eventDetails?.description.substring(0, 100) + "..."
              : "" ?? ""}
          </span>
        </div>
        <div className='flex flex-col gap-1'>
          <a
            className='text-gray-700 font-medium text-center break-all'
            href={data.eventDetails.socialLink}
            target={"_blank"}
          >
            <span className='text-black break-all'>Social Link: </span>
            {data.eventDetails.socialLink}
          </a>
          <span>
            <span className='font-semibold break-all'>Date: </span>{" "}
            {moment(data.eventDetails.date.toNumber() * 1000).format("lll")}
          </span>
        </div>
      </div>
      <div className='flex justify-center mt-4 items-center'>
        <button
          className='flex justify-center px-10 py-1 border rounded-3xl hover:border-black'
          onClick={() => dispatch(showQrModal(data.id))}
        >
          Show QR
        </button>
      </div>
    </div>
  );
};

export default EventCardNft;
