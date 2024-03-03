import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null
};

// login, logout and register are all actions, api calls are thunks
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('jwt');
    },
    register(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
});

export const { login, logout, register } = authSlice.actions;
export default authSlice.reducer;