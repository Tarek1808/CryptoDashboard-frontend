import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: [],
};

export const walletSlice = createSlice({
    name: 'wallets',
    initialState,
    reducers: {
        addWallet: (state, action) => {
            state.value.push(action.payload);
        },
        removeWallet: (state, action) => {
            state.value = state.value.filter(wallet => wallet.address !== action.payload);
          },
        loadWallets: (state, action) => {
            state.value = action.payload
        },
        clearWallets: (state) => {
            state.value = []
        }
    },
});

export const { addWallet, removeWallet, loadWallets, clearWallets } = walletSlice.actions;
export default walletSlice.reducer;
