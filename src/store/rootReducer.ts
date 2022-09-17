import { combineReducers } from "@reduxjs/toolkit";
import { cartReducer } from "./cart/reducer";
import { guitarReducer } from "./guitar/reducer";
import { uiReducer } from "./ui/reducer";

export const rootReducer = combineReducers({
  ui: uiReducer,
  guitar: guitarReducer,
  cart: cartReducer,
});
