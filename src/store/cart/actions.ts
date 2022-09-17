import { createAction } from "@reduxjs/toolkit";
import { Guitar } from "types/guitar";

enum ActionType {
  SetCart = "cart/setCart",
  RemoveFromCart = "cart/removeFromCart",
}

export const setCart = createAction(ActionType.SetCart, (guitar: Guitar) => ({ payload: guitar }));
export const removeFromCart = createAction(ActionType.RemoveFromCart, (id: Guitar["id"]) => ({ payload: id }));
