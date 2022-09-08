import { createReducer } from "@reduxjs/toolkit";
import { Guitar } from "types/guitar";
import { setGuitar, setGuitars } from "./actions";

type State = {
  guitars: Guitar[] | null;
  guitar: Guitar | null;
};

export const initialState: State = {
  guitars: null,
  guitar: null,
};

export const guitarReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setGuitars, (state, action) => {
      state.guitars = action.payload;
    })
    .addCase(setGuitar, (state, action) => {
      state.guitar = action.payload;
    });
});