import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loginState: false,
};
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoginState: (state, action) => {
      return action.payload;
    },
  },
});

export default loginSlice.reducer;
export const { setLoginState } = loginSlice.actions;
