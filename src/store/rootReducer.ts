import { combineReducers } from "@reduxjs/toolkit";
import { cartReducer } from "./cart/reducer";
import { guitarReducer } from "./guitar/reducer";
import { shopReducer } from "./shop/reducer";
import { uiReducer } from "./ui/reducer";

export const rootReducer = combineReducers({
  guitar: guitarReducer,
  cart: cartReducer,
  shop: shopReducer,
  ui: uiReducer,
});
