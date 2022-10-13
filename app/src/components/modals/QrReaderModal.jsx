import { useDispatch, useSelector } from "react-redux";
import QRCode from "react-qr-code";

import { hideQrModal } from "../../slices/modalSlice";
import { connectMetamask } from "../../slices/metamaskSlice";

export default function QrReaderModal() {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal);

  return (
    <div className='absolute flex w-full h-full justify-center items-center bg-black bg-opacity-40'>
      <div className='flex justify-center items-center relative border bg-white flex-col z-50 max-w-3xl w-[400px] p-6 rounded-3xl'>
        <div className='grid grid-cols-7 w-full justify-between'>
          <div className='col-span-1'></div>
          <span className='text-xl font-bold col-span-4 col-start-3'>
            Check balance of
          </span>
          <div className='flex justify-end '>
            <svg
              width='1.5em'
              height='1.5em'
              viewBox='0 0 15 15'
              onClick={() => dispatch(hideQrModal())}
              className='col-span-1 flex justify-items-end justify-evenly just'
            >
              <path
                fill='currentColor'
                fillRule='evenodd'
                d='M11.782 4.032a.575.575 0 1 0-.813-.814L7.5 6.687L4.032 3.218a.575.575 0 0 0-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 0 0 .814.814L7.5 8.313l3.469 3.469a.575.575 0 0 0 .813-.814L8.313 7.5l3.469-3.468Z'
                clipRule='evenodd'
              ></path>
            </svg>
          </div>
        </div>
        <div className='flex flex-col gap-2 w-full justify-center text-center mt-8'>
          <QRCode
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={modal && modal.qrData.toString()}
            viewBox={`0 0 256 256`}
          />
        </div>
      </div>
    </div>
  );
}
