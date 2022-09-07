import { configureStore, ThunkDispatch, Action, ThunkAction } from "@reduxjs/toolkit";
import { AxiosInstance } from "axios";
import { createAPI } from "axiosAPI/axiosAPI";
import { rootReducer } from "./rootReducer";

const axiosAPI = createAPI();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: axiosAPI,
      },
    }),
});

export type RootReducerState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<RootReducerState, AxiosInstance, Action>;
export type AsyncActionResult = ThunkAction<Promise<void>, RootReducerState, AxiosInstance, Action>;
