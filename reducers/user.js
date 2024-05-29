import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = { };
    },
    updateEmail: (state,action) => {
      state.value.email = action.payload
    },
    pushTotalValue: (state,action) => {
      state.value.totalValue.push(action.payload)
    },
  },
});

export const { login, logout, updateEmail, pushTotalValue } = userSlice.actions;
export default userSlice.reducer;
