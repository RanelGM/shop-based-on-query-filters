import { createAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { Viewport } from "utils/constants";

enum ActionType {
  SetViewport = "ui/setViewport",
  SetPaginationCount = "ui/setPaginationCount",
  SetError = "ui/setError",
}

export const setViewport = createAction(ActionType.SetViewport, (viewport: Viewport) => ({ payload: viewport }));

export const setPaginationCount = createAction(ActionType.SetPaginationCount, (count: number) => ({
  payload: count,
}));

export const setError = createAction(ActionType.SetError, (error: AxiosError | null) => ({ payload: error }));
