import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ethers } from 'ethers'; 


interface WalletState {
  address: string | null;
  provider: ethers.providers.Web3Provider | null;
  isConnected: boolean;
}

const initialState: WalletState = {
  address: null,
  provider: null,
  isConnected: false,
};

export const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {
    setWalletAddress: (state, action: PayloadAction<string | null>) => {
      state.address = action.payload;
      state.isConnected = action.payload !== null;
    },
    setWalletProvider: (state, action: PayloadAction<ethers.providers.Web3Provider | null>) => {
      state.provider = action.payload;
    },
    clearWalletData: (state) => {
      state.address = null;
      state.provider = null;
      state.isConnected = false;
    },
  },
});


export const { setWalletAddress, setWalletProvider, clearWalletData } = walletSlice.actions;

export default walletSlice.reducer;
