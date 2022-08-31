import { createAction } from "@reduxjs/toolkit";
import { Viewport } from "utils/constants";

enum ActionType {
  SetViewport = "ui/setViewport",
}

export const setViewport = createAction(ActionType.SetViewport, (viewport: Viewport) => ({ payload: viewport }));
