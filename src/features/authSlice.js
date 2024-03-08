import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      console.log("login action:", action.payload);
      const { user, token } = action.payload;
      return {
        ...state,
        user,
        token
      };
    },
    logout(state) {
      return {
        ...state,
        user: null,
        token: null
      };
    },
    register(state, action) {
      const { user, token } = action.payload;
      return {
        ...state,
        user,
        token
      };
    },
  },
});

export const { login, logout, register } = authSlice.actions;
export default authSlice.reducer;