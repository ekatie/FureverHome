import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDogs, getDog } from "../services/dogsService";
import API from "../services/api";

export const fetchDogsAsync = createAsyncThunk(
  "dogs/fetchDogs",
  async () => {
    const response = await getDogs();
    return response;
  }
);

export const toggleFavouriteAsync = createAsyncThunk(
  'dogs/toggleFavorite',
  async ({ dogId, userId }, { getState }
  ) => {
    const response = await API.post(`/dogs/${dogId}/favourite`);
    return { dogId, isFavourite: response.data.is_favourite };
  }
);

export const fetchDogAsync = createAsyncThunk(
  "dogs/fetchDog",
  async (dogId) => {
    const response = await getDog(dogId);
    return response.data;
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
      state.dogs.push(action.payload);
    },
    updateDog(state, action) {
      const { id, updatedDog } = action.payload;
      state.dogs = state.dogs.map(dog =>
        dog.id === id ? updatedDog : dog
      );
    },
    fetchDog(state, action) {
      state.dog = action.payload;
    },
    toggleFavourite(state, action) {
      const { id, isFavourite } = action.payload;
      state.dogs = state.dogs.map(dog =>
        dog.id === id ? { ...dog, isFavourite } : dog
      );
      dispatchEvent(toggleFavouriteAsync({ id, isFavourite }));
    },
    fetchFavourites(state, action) {
      state.dogs = action.payload;
    },
    resetFavourites(state) {
      state.dogs = state.dogs.map(dog => ({ ...dog, isFavourite: false }));
    }
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
      });
    builder.addCase(toggleFavouriteAsync.fulfilled, (state, action) => {
      const { dogId, isFavourite } = action.payload;
      const index = state.dogs.findIndex(dog => dog.id === dogId);
      if (index !== -1) {
        state.dogs[index] = { ...state.dogs[index], is_favourite: isFavourite };
      }
    });
  }
});


export const { fetchDogs, addDog, updateDog, fetchDog, toggleFavourite, fetchFavourites, resetFavourites } = dogSlice.actions;
export default dogSlice.reducer;