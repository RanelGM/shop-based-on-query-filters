import { createReducer } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { setError, setPaginationCount, setViewport } from "./actions";
import { Viewport } from "utils/constants";
import { checkViewport } from "utils/utils";

type State = {
  currentViewport: Viewport;
  paginationCount: number;
  error: AxiosError | null;
};

export const initialState: State = {
  currentViewport: checkViewport(),
  paginationCount: 0,
  error: null,
};

export const uiReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setViewport, (state, action) => {
      state.currentViewport = action.payload;
    })
    .addCase(setPaginationCount, (state, action) => {
      state.paginationCount = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});
