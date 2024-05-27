import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        totalValue: 0,
        btcValue: null,
        ethValue: null,
        solValue: null,
    },
};

export const valueSlice = createSlice({
    name: 'value',
    initialState,
    reducers: {
        updateTotalValue: (state, action) => {
            state.value.totalValue = action.payload;
        },
        updateValue: (state, action) => {
            const cryptoName = action.payload.name
            if (cryptoName === "BTC")
                state.value.btcValue = action.payload.quantity
            else if (cryptoName === "ETH")
                state.value.ethValue = action.payload.quantity
            else if (cryptoName === "SOL")
                state.value.solValue = action.payload.quantity
        },
    },
});

export const { updateValue, updateTotalValue } = valueSlice.actions;
export default valueSlice.reducer;
