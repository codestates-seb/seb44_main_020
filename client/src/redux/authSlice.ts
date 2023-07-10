import { createSlice } from '@reduxjs/toolkit';
// import { RootState } from '../store/store';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: null,
    token: null,
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const { setUser, setToken } = loginSlice.actions;

export default loginSlice.reducer; // reducer 해주면 리턴이 됨
// export const selectCurrentUser = (state: RootState) => state.auth;
// export const selectCurrentToken = (state: RootState) => state.auth;
