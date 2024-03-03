import { createSlice } from "@reduxjs/toolkit";

const dogSlice = createSlice({
  name: "dogs",
  initialState: {
    dog: {},
    dogs: [],
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
});

export const { fetchDogs, addDog, updateDog, fetchDog, toggleFavourite, fetchFavourites } = dogSlice.actions;
export default dogSlice.reducer;