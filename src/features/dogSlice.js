import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDogs, getDog, getAdminDogs, getAdminDog, adminUpdateDog, adminAddDog } from "../services/dogsService";
import API from "../services/api";

export const fetchDogsAsync = createAsyncThunk(
  "dogs/fetchDogs",
  async () => {
    const response = await getDogs();
    return response;
  }
);

export const fetchAdminDogsAsync = createAsyncThunk(
  "dogs/fetchAdminDogs",
  async () => {
    const response = await getAdminDogs();
    // Sort the dogs by name
    const sortedDogs = response.sort((a, b) => a.name.localeCompare(b.name));
    return sortedDogs;
  }
);

export const fetchAdminDogAsync = createAsyncThunk(
  "dogs/fetchAdminDog",
  async (dogId, { dispatch, getState }) => {
    const response = await getAdminDog(dogId);
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

export const addDogAsync = createAsyncThunk(
  "dogs/addDog",
  async ({ dog }) => {
    const response = await adminAddDog(dog);
    return response.data;
  }
);

export const updateDogAsync = createAsyncThunk(
  "dogs/updateDog",
  async ({ id, dog }) => {
    const response = await adminUpdateDog(id, dog);
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
    builder
      .addCase(fetchAdminDogsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdminDogsAsync.fulfilled, (state, action) => {
        state.dogs = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchAdminDogsAsync.rejected, (state) => {
        state.status = "failed";
      });
    builder
      .addCase(fetchAdminDogAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAdminDogAsync.fulfilled, (state, action) => {
        const index = state.dogs.findIndex(dog => dog.id === action.payload.id);
        if (index !== -1) {
          state.dogs[index] = action.payload;
          state.status = "succeeded";
        } else {
          state.dogs.push(action.payload);
        }
      })
      .addCase(fetchAdminDogAsync.rejected, (state) => {
        state.status = "failed";
      });
  }
});


export const { fetchDogs, addDog, updateDog, fetchDog, toggleFavourite, fetchFavourites, resetFavourites } = dogSlice.actions;
export default dogSlice.reducer;