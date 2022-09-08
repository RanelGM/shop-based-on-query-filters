import { createReducer } from "@reduxjs/toolkit";
import { setPaginationCount, setViewport } from "./actions";
import { Viewport } from "utils/constants";
import { checkViewport } from "utils/utils";

type State = {
  currentViewport: Viewport;
  paginationCount: number;
};

export const initialState: State = {
  currentViewport: checkViewport(),
  paginationCount: 0,
};

export const uiReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setViewport, (state, action) => {
      state.currentViewport = action.payload;
    })
    .addCase(setPaginationCount, (state, action) => {
      state.paginationCount = action.payload;
    });
});
