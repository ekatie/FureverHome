import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import dogsReducer from "./dogSlice";
import applicationReducer from "./applicationSlice";
import authReducer from "./authSlice";

const rootReducer = combineReducers({
  dogs: dogsReducer,
  user: userReducer,
  application: applicationReducer,
  auth: authReducer,
});

export default rootReducer;