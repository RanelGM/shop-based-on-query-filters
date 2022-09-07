import { createAction } from "@reduxjs/toolkit";
import { Guitar } from "types/guitar";

enum ActionType {
  SetGuitars = "guitars/setGuitars",
  SetGuitar = "guitars/setGuitar",
}

export const setGuitars = createAction(ActionType.SetGuitars, (guitars: Guitar[]) => ({ payload: guitars }));
export const setGuitar = createAction(ActionType.SetGuitar, (guitar: Guitar) => ({ payload: guitar }));
