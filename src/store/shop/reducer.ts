import { createReducer } from "@reduxjs/toolkit";
import { City, Shop } from "types/shop";
import { setShops, setUserCity } from "./actions";

type State = {
  shops: Shop[] | null;
  userCity: City | null;
};

export const initialState: State = {
  shops: null,
  userCity: null,
};

export const shopReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setShops, (state, action) => {
      state.shops = action.payload;
    })
    .addCase(setUserCity, (state, action) => {
      state.userCity = action.payload;
    });
});
