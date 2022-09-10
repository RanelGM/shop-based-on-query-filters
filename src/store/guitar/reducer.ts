import { createReducer } from "@reduxjs/toolkit";
import { Guitar, Price } from "types/guitar";
import { setGuitar, setGuitars, setPrice } from "./actions";

type State = {
  guitars: Guitar[] | null;
  guitar: Guitar | null;
  price: Price | null;
};

export const initialState: State = {
  guitars: null,
  guitar: null,
  price: null,
};

export const guitarReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGuitars, (state, action) => {
      state.guitars = action.payload;
    })
    .addCase(setGuitar, (state, action) => {
      state.guitar = action.payload;
    })
    .addCase(setPrice, (state, action) => {
      state.price = action.payload;
    });
});
