import { createAction } from "@reduxjs/toolkit";
import { Guitar, Price } from "types/guitar";

enum ActionType {
  SetGuitars = "guitars/setGuitars",
  SetGuitar = "guitars/setGuitar",
  SetPrice = "guitars/setPrice",
}

export const setGuitars = createAction(ActionType.SetGuitars, (guitars: Guitar[]) => ({ payload: guitars }));
export const setGuitar = createAction(ActionType.SetGuitar, (guitar: Guitar) => ({ payload: guitar }));
export const setPrice = createAction(ActionType.SetPrice, (price: Price) => ({ payload: price }));
