import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import dogsReducer from './features/dogSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    dogs: dogsReducer,
  },
});
