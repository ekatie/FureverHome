import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {}
  },
  reducers: {
    fetchUser(state, action) {
      return {
        ...state,
        user: action.payload
      };
    },
    addUser(state, action) {
      return {
        ...state,
        user: action.payload
      };
    },
    updateUser(state, action) {
      return {
        ...state,
        user: action.payload
      };
    }
  }
});

export const { fetchUser, addUser, updateUser } = userSlice.actions;
export default userSlice.reducer;