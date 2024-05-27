import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { data: { token: null } },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = { data: { token: null } };
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
