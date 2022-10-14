import { Html5Qrcode } from "html5-qrcode";
import { useDispatch } from "react-redux";
import { showCameraModal } from "../slices/modalSlice";

const VerifyNftCard = ({ events }) => {
  const dispatch = useDispatch();
  // const modal = useSelector((state = state.modal));

  return (
    <>
      {events.length > 0 ? (
        events.map((data, index) => {
          return (
            <div
              className='flex flex-col w-full p-5 border rounded-2xl mt-4 gap-2 hover:border-black cursor-pointer'
              key={index}
            >
              <span className='font-bold text-xl text-center'>
                {data.eventDetails.name}
              </span>
              <span className='text-gray-700 font-medium text-center'>
                {data.eventDetails?.description.length > 50
                  ? data.eventDetails?.description.substring(0, 100) + "..."
                  : "" ?? ""}
              </span>
              <div className='flex justify-center w-full rounded-xl'>
                <img
                  src={data.eventDetails.profile}
                  width='100%'
                  alt='Event image'
                  className='rounded-xl'
                />
              </div>
              <span className='text-gray-700 font-medium text-center'>
                {data.eventDetails.socialLink}
              </span>
              <div className='flex text-center'>
                <span>
                  <span className='font-semibold'>Date:</span>{" "}
                  {Date(data.eventDetails.date.toNumber() * 1000)}
                </span>
              </div>
              <div className='flex justify-center mt-8 items-center'>
                <button
                  className='flex justify-center px-10 py-1 border rounded-3xl hover:border-black'
                  onClick={() => dispatch(showCameraModal())}
                >
                  Verify
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div className='flex w-full justify-start mt-5'>
          <span className='text-center'>There are no events yet...</span>
        </div>
      )}
    </>
  );
};

export default VerifyNftCard;
