import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../services/api";

export const submitApplicationAsync = createAsyncThunk(
  "application/submitApplication",
  async (application) => {
    const response = await API.post("/applications", application);
    return response.data;
  }
);

const initialState = {
  application: {},
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
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
  extraReducers: (builder) => {
    builder
      .addCase(submitApplicationAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitApplicationAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.application = action.payload;
      })
      .addCase(submitApplicationAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

export const { fetchApplication, addApplication, updateApplication, cancelApplication } = applicationSlice.actions;
export default applicationSlice.reducer;
