import { createSlice } from "@reduxjs/toolkit";
import setAuthToken from "../services/api";

const initialState = {
  user: null,
  token: null
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

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("authTokens");
  localStorage.removeItem("userData");
  setAuthToken(null);
  dispatch(logout());
};

export const { login, logout, register } = authSlice.actions;
export default authSlice.reducer;