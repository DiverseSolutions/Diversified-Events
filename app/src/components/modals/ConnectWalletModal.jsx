import { useDispatch, useSelector } from "react-redux";

import { hideConnectWalletModal } from "../../slices/modalSlice";
import { connectMetamask } from "../../slices/metamaskSlice";

export default function ConnectWalletModal() {
  const dispatch = useDispatch();

  async function connectToMetamask() {
    dispatch(connectMetamask());
    dispatch(hideConnectWalletModal());
  }

  return (
    <div className="absolute flex w-full h-full justify-center items-center bg-black bg-opacity-40">
      <div className="flex justify-center items-center relative border bg-white flex-col z-50 max-w-3xl w-[400px] p-6 rounded-3xl">
        <div className="grid grid-cols-7 w-full justify-between">
          <div className="col-span-1"></div>
          <span className="text-xl font-bold col-span-4 col-start-3">
            Connect wallet
          </span>
          <div className="flex justify-end ">
            <svg
              width="1.5em"
              height="1.5em"
              viewBox="0 0 15 15"
              onClick={() => dispatch(hideConnectWalletModal())}
              className="col-span-1 flex justify-items-end justify-evenly just"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M11.782 4.032a.575.575 0 1 0-.813-.814L7.5 6.687L4.032 3.218a.575.575 0 0 0-.814.814L6.687 7.5l-3.469 3.468a.575.575 0 0 0 .814.814L7.5 8.313l3.469 3.469a.575.575 0 0 0 .813-.814L8.313 7.5l3.469-3.468Z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full justify-center text-center mt-8">
          <div
            className="flex justify-center items-center py-1 gap-2 w-full border rounded-3xl cursor-pointer"
            onClick={() => connectToMetamask()}
          >
            <img
              src="https://snapshot.mypinata.cloud/ipfs/QmTE7VPXMhriKAobMWEiC5S3oG22p4G6AXGyGdNWQTQ3Fv"
              width={"30px"}
              height={"30px"}
              alt=""
            />
            <span className="cursor-pointer">MetaMask</span>
          </div>
          <div className="flex justify-center items-center py-1 gap-2 w-full border rounded-3xl">
            <img
              src="https://snapshot.mypinata.cloud/ipfs/QmZRVqHpgRemw13aoovP2EaQdVtjzXRaQGQZsCLXWaNn9x"
              width={"30px"}
              height={"30px"}
              alt=""
            />
            <span className="cursor-pointer">WalletConnect</span>
          </div>
          <div className="flex justify-center items-center py-1 gap-2 w-full border rounded-3xl">
            <img
              src="https://snapshot.mypinata.cloud/ipfs/QmbJKEaeMz6qR3DmJSTxtYtrZeQPptVfnnYK72QBsvAw5q"
              width={"30px"}
              height={"30px"}
              alt=""
            />
            <span className="cursor-pointer">Coinbase Wallet</span>
          </div>
          <div className="flex justify-center items-center py-1 w-full border rounded-3xl">
            <span>Show more</span>
            <svg width="1.5em" height="1.5em" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M8.12 9.29L12 13.17l3.88-3.88a.996.996 0 1 1 1.41 1.41l-4.59 4.59a.996.996 0 0 1-1.41 0L6.7 10.7a.996.996 0 0 1 0-1.41c.39-.38 1.03-.39 1.42 0z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
