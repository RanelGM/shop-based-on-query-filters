import { createReducer } from "@reduxjs/toolkit";
import { Price } from "types/common";
import { Guitar } from "types/guitar";
import { setGuitar, setGuitars, setPrice, setSearch } from "./actions";

type State = {
  guitars: Guitar[] | null;
  guitar: Guitar | null;
  search: Guitar[] | null;
  price: Price;
};

export const initialState: State = {
  guitars: null,
  guitar: null,
  search: null,
  price: {
    min: 0,
    max: 0,
  },
};

export const guitarReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGuitars, (state, action) => {
      state.guitars = action.payload;
    })
    .addCase(setGuitar, (state, action) => {
      state.guitar = action.payload;
    })
    .addCase(setSearch, (state, action) => {
      state.search = action.payload;
    })
    .addCase(setPrice, (state, action) => {
      state.price = action.payload;
    });
});
