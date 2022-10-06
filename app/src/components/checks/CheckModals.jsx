import { useSelector } from "react-redux";
import ConnectWalletModal from "../modals/ConnectWalletModal";

const CheckModals = ({ children }) => {
  const modalState = useSelector((state) => state.modal);
  console.log("modalState: ", modalState.showConnectWalletModal);
  return (
    <>
      {modalState.showConnectWalletModal === true && <ConnectWalletModal />}
      {children}
    </>
  );
};

export default CheckModals;
