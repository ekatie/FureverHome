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
      const index = state.dogs.findIndex(dog => dog.id === action.payload.id);
      if (index !== -1 && action.payload) {
        state.dogs[index] = {
          ...state.dogs[index],
          ...action.payload
        };
      }
    },
    deleteDog: (state, action) => {
      const index = state.dogs.findIndex(dog => dog.id === action.payload);
      if (index !== -1) {
        state.dogs.splice(index, 1);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.dogs = state.dogs.concat(action.payload);
      })
      .addCase(fetchDogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default dogSlice.reducer;
