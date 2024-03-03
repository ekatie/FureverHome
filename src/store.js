import { configureStore } from "@reduxjs/toolkit";
import dogsReducer from "./features/dogSlice";
import userReducer from "./features/userSlice";
import applicationReducer from "./features/applicationSlice";
import authReducer from "./features/authSlice";

const store = configureStore({
  reducer: {
    dogs: dogsReducer,
    user: userReducer,
    application: applicationReducer,
    auth: authReducer,
  },
});

export default store;