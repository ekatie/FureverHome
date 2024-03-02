import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getDogs, getDog, addDog, updateDog, deleteDog } from '../services/dogsService';

export const fetchDogs = createAsyncThunk('dogs/fetchDogs', async (_, { rejectWithValue }) => {
  try {
    return await getDogs();
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const dogSlice = createSlice({
  name: 'dogs',
  initialState: {
    dogs: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addDog: (state, action) => {
      state.dogs.push(action.payload);
    },
    getDog: (state, action) => {
      return state.dogs.find(dog => dog.id === action.payload);
    },
    updateDog: (state, action) => {
      const dog = state.dogs.findIndex(dog => dog.id === action.payload.id);
      if (index !== -1 && action.payload) {
        dog.name = action.payload.name;
        dog.age = action.payload.age;
        dog.sex = action.payload.sex;
        dog.breed = action.payload.breed;
        dog.size = action.payload.size;
        dog.description = action.payload.description;
        dog.status = action.payload.status;
        dog.energy_level = action.payload.energy_level;
        dog.social_media_link = action.payload.social_media_link;
        dog.good_with_dogs = action.payload.good_with_dogs;
        dog.good_with_cats = action.payload.good_with_cats;
        dog.good_with_kids = action.payload.good_with_kids;
        dog.foster_location = action.payload.foster_location;
        dog.medical_conditions = action.payload.medical_conditions;
        dog.adoption_fee = action.payload.adoption_fee;
        dog.default_image = action.payload.default_image;
      }
    },
    deleteDog: (state, action) => {
      const index = state.dogs.findIndex(dog => dog.id === action.payload);
      if (index !== -1) {
        state.dogs.splice(index, 1);
      }
    }
  },
  extraReducers: {
    [fetchDogs.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchDogs.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.dogs = state.dogs.concat(action.payload);
    },
    [fetchDogs.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export default dogSlice.reducer;
