import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        totalValue: 0,
        cryptoData: null,
    },
};

export const valueSlice = createSlice({
    name: 'value',
    initialState,
    reducers: {
        updateTotalValue: (state, action) => {
            state.value.totalValue = action.payload;
        },
        updateData: (state, action) => {
            state.value.cryptoData = action.payload
        },
    },
});

export const { updateData, updateTotalValue } = valueSlice.actions;
export default valueSlice.reducer;
