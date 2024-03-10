import { createSlice } from "@reduxjs/toolkit";
import setAuthToken from "../services/api";
import { resetFavourites } from "./dogSlice";

const initialState = {
  user: null,
  token: null
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("authTokens");
  localStorage.removeItem("userData");
  setAuthToken(null);
  dispatch(logout());
  dispatch(resetFavourites());
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
    register(state, action) {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
  },
});

export const { login, logout, register } = authSlice.actions;
export default authSlice.reducer;