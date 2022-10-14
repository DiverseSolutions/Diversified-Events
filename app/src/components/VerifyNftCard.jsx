import { Html5Qrcode } from "html5-qrcode";
import { useDispatch } from "react-redux";
import { showCameraModal } from "../slices/modalSlice";

const VerifyNftCard = (props) => {
  const { data } = props;
  const dispatch = useDispatch();
  // const modal = useSelector((state = state.modal));

  return (
    <div className="flex flex-col justify-center text-center border rounded-2xl min-h-60 p-3 hover:border-black cursor-pointer select-none">
      <div className="w-full flex justify-center">
        <img
          src={data.logo}
          width={"80px"}
          height={"80px"}
          alt="Nft image"
          className="flex justify-center text-center"
        />
      </div>
      <div className="flex flex-col mt-4">
        <span className="font-medium text-xs">{data.date}</span>
        <span className="text-lg font-semibold">{data.name}</span>
        <span className="font-medium text-gray-500 hover:underline cursor-pointer">
          {data.organizer}
        </span>
      </div>
      <div className="flex justify-center mt-8 items-center">
        <button
          className="flex justify-center px-10 py-1 border rounded-3xl hover:border-black"
          onClick={() => dispatch(showCameraModal())}
        >
          Verify
        </button>

        {/* <div id='qrScanner' width='900px' height='900px'></div> */}
      </div>
    </div>
  );
};

export default VerifyNftCard;
