import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";

import dogsReducer from "./features/dogSlice";
import userReducer from "./features/userSlice";
import applicationReducer from "./features/applicationSlice";
import authReducer from "./features/authSlice";

const rootReducer = combineReducers({
  dogs: dogsReducer,
  user: userReducer,
  application: applicationReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export default store;
