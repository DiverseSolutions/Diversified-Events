import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    showConnectWalletModal: false,
  },
  reducers: {
    showConnectWalletModal: (state) => {
      state.showConnectWalletModal = true;
    },
    hideConnectWalletModal: (state) => {
      state.showConnectWalletModal = false;
    },
  },
});

export const { showConnectWalletModal, hideConnectWalletModal } =
  modalSlice.actions;

export const modalReducer = modalSlice.reducer;
