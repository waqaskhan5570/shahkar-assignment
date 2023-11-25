import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  user: null,
  isAuthorized: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthorized = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: state => {
      state.isAuthorized = false;
      state.token = null;
      state.user = null;
    },
    updateUser: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, updateUser } = authSlice.actions;

export default authSlice.reducer;
