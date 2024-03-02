import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    login: (state, action) => {
      // Handle login
    },
    logout: (state) => {
      // Handle logout
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;