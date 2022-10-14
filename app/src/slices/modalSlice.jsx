import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    showConnectWalletModal: false,
    showQrModal: false,
    showCameraModal: false,
    cameraData: null,
    qrData: null,
  },
  reducers: {
    showConnectWalletModal: (state) => {
      state.showConnectWalletModal = true;
    },
    hideConnectWalletModal: (state) => {
      state.showConnectWalletModal = false;
    },
    showQrModal: (state, action) => {
      state.showQrModal = true;
      state.qrData = action.payload;
    },
    hideQrModal: (state) => {
      state.showQrModal = false;
    },
    showCameraModal: (state,action) => {
      state.showCameraModal = true;
      console.log(action)
      state.cameraData = action.payload;
    },
    hideCameraModal: (state) => {
      state.showCameraModal = false;
    },
  },
});

export const {
  showConnectWalletModal,
  hideConnectWalletModal,
  showQrModal,
  hideQrModal,
  showCameraModal,
  hideCameraModal,
} = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
