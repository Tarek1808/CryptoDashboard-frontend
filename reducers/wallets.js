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
        }
    },
});

export const { addWallet, removeWallet, loadWallets } = walletSlice.actions;
export default walletSlice.reducer;
