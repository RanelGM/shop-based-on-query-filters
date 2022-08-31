import { combineReducers } from "@reduxjs/toolkit";
import { uiReducer } from "./ui/reducer";

export const rootReducer = combineReducers({
  ui: uiReducer,
});
