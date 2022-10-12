import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showConnectWalletModal } from "../slices/modalSlice";
import Dropdown from "./Dropdown";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const metamask = useSelector((state) => state.metamask);

  return (
    <div className='flex h-[70px] justify-center items-center border-b border-t w-full'>
      <div className='flex items-center justify-between max-w-5xl w-full'>
        <span
          className='font-medium text-lg cursor-pointer select-none'
          onClick={() => navigate("/")}
        >
          Diversified Events
        </span>
        <div className='flex items-center gap-2'>
          <button
            className='flex gap-2 items-center px-5 py-2 border rounded-3xl hover:border-black text-gray-500 font-semibold'
            onClick={() => {
              if (!metamask.isConnected) dispatch(showConnectWalletModal());
            }}
          >
            {metamask && metamask.isConnected ? (
              <div className='flex items-center gap-2 select-none'>
                <img
                  src='https://cdn.stamp.fyi/avatar/eth:0x1Fd9afb27FF1194b92C80eDA157C7eAC4C509F33?s=36'
                  alt=''
                  width={"20px"}
                  height={"20px"}
                  className='rounded-full'
                />
                {metamask.selectedAccount.substring(0, 6)}...
                {metamask.selectedAccount.substring(
                  metamask.selectedAccount.length - 4
                )}
              </div>
            ) : (
              "Connect wallet"
            )}
          </button>
          <div className='flex justify-center'>
            <Dropdown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
