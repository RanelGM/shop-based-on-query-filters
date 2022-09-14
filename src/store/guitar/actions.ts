import { createAction } from "@reduxjs/toolkit";
import { Price } from "types/common";
import { Guitar } from "types/guitar";

enum ActionType {
  SetGuitars = "guitars/setGuitars",
  SetGuitar = "guitars/setGuitar",
  SetPrice = "guitars/setPrice",
  SetSearch = "guitars/setSearch",
}

export const setGuitars = createAction(ActionType.SetGuitars, (guitars: Guitar[]) => ({ payload: guitars }));
export const setGuitar = createAction(ActionType.SetGuitar, (guitar: Guitar) => ({ payload: guitar }));
export const setPrice = createAction(ActionType.SetPrice, (price: Price) => ({ payload: price }));
export const setSearch = createAction(ActionType.SetSearch, (search: Guitar[] | null) => ({ payload: search }));
