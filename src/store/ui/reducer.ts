import { createReducer } from "@reduxjs/toolkit";
import { setViewport } from "./actions";
import { Viewport } from "utils/constants";
import { checkViewport } from "utils/utils";

type State = {
  currentViewport: Viewport;
};

export const initialState: State = {
  currentViewport: checkViewport(),
};

export const uiReducer = createReducer(initialState, (builder) => {
  builder.addCase(setViewport, (state, action) => {
    state.currentViewport = action.payload;
  });
});
