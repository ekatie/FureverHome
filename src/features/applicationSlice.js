import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    application: {},
  },
  reducers: {
    fetchApplication(state, action) {
      state.application = action.payload;
    },
    addApplication(state, action) {
      state.application = action.payload;
    },
    updateApplication(state, action) {
      state.application = action.payload;
    },
    cancelApplication(state, action) {
      state.application = action.payload;
    }
  },
});

export const { fetchApplication, addApplication, updateApplication, cancelApplication } = applicationSlice.actions;
export default applicationSlice.reducer;