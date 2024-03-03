import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {}
  },
  reducers: {
    fetchUser(state, action) {
      state.user = action.payload;
    },
    addUser(state, action) {
      state.user = action.payload;
    },
    updateUser(state, action) {
      state.user = action.payload;
    }
  }
});

export const { fetchUser, addUser, updateUser } = userSlice.actions;
export default userSlice.reducer;