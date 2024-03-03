import { createSlice } from "@reduxjs/toolkit";

// login, logout and register are all actions, api calls are thunks
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = {};
    },
    register(state, action) {
      state.user = action.payload;
    },
  },
});

export const { login, logout, register } = authSlice.actions;
export default authSlice.reducer;