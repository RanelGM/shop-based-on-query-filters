import { createAction } from "@reduxjs/toolkit";
import { Viewport } from "utils/constants";

enum ActionType {
  SetViewport = "ui/setViewport",
  SetPaginationCount = "ui/setPaginationCount",
}

export const setViewport = createAction(ActionType.SetViewport, (viewport: Viewport) => ({ payload: viewport }));

export const setPaginationCount = createAction(ActionType.SetPaginationCount, (count: number) => ({
  payload: count,
}));
