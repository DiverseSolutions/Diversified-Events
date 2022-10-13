import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Html5Qrcode } from "html5-qrcode";

import { hideCameraModal } from "../../slices/modalSlice";

export default function CameraModal() {
  const dispatch = useDispatch();

  useEffect(() => {
    onVerifyBtn();
  }, []);

  async function onVerifyBtn() {
    const html5QrCode = new Html5Qrcode("qrScanner");
    const qrCodeSuccessCallback = (decodedText, decodedResult) => {
      /* handle success */
      alert(decodedText);
    };
    const config = { fps: 10, qrbox: { width: 250, height: 250 } };

    // If you want to prefer front camera
    await html5QrCode.start(
      { facingMode: "environment" },
      config,
      qrCodeSuccessCallback
    );
  }

  return (
    <div className='absolute flex w-full min-h-full justify-center items-center bg-black bg-opacity-40'>
      <div className='flex justify-center items-center relative border bg-white flex-col z-50 max-w-3xl w-[400px] p-6 rounded-3xl'>
        <div className='flex w-full justify-between'>
          <span className='text-xl font-bold col-span-4'>Camera</span>
          <div className='flex justify-end '>
            <svg
              width='1.5em'
              height='1.5em'
              viewBox='0 0 15 15'
              onClick={() => {
                dispatch(hideCameraModal());
                html5QrCode.stop();
              }}
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
          <div id='qrScanner' width='1000px' height='1000px'></div>
        </div>
      </div>
    </div>
  );
}
