import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDogs } from "../services/dogsService";

export const fetchDogsAsync = createAsyncThunk(
  "dogs/fetchDogs",
  async () => {
    const response = await getDogs();
    return response;
  }
);

const dogSlice = createSlice({
  name: "dogs",
  initialState: {
    dogs: [],
    status: "idle",
  },
  reducers: {
    fetchDogs(state, action) {
      state.dogs = action.payload;
    },
    addDog(state, action) {
      state.dogs = action.payload;
    },
    updateDog(state, action) {
      state.dogs = action.payload;
    },
    fetchDog(state, action) {
      state.dog = action.payload;
    },
    toggleFavourite(state, action) {
      state.dog = action.payload;
    },
    fetchFavourites(state, action) {
      state.dogs = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDogsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDogsAsync.fulfilled, (state, action) => {
        state.dogs = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchDogsAsync.rejected, (state) => {
        state.status = "failed";
      },
      );
  }
});

export const { fetchDogs, addDog, updateDog, fetchDog, toggleFavourite, fetchFavourites } = dogSlice.actions;
export default dogSlice.reducer;