import { useSelector } from "react-redux";
import ConnectWalletModal from "../modals/ConnectWalletModal";
import QrReaderModal from "../modals/QrReaderModal";
import CameraModal from "../modals/CameraModal";

const CheckModals = ({ children }) => {
  const modalState = useSelector((state) => state.modal);
  return (
    <>
      {modalState.showConnectWalletModal === true && <ConnectWalletModal />}
      {modalState.showQrModal === true && <QrReaderModal />}
      {modalState.showCameraModal === true && <CameraModal />}
      {children}
    </>
  );
};

export default CheckModals;
