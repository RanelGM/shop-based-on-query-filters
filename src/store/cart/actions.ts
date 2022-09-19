import { createAction } from "@reduxjs/toolkit";
import { CartItem } from "types/cart";
import { Guitar } from "types/guitar";

enum ActionType {
  SetGuitarInCart = "cart/setGuitarInCart",
  SetCartItem = "cart/setCartItem",
  RemoveFromCart = "cart/removeFromCart",
}

export const setGuitarInCart = createAction(ActionType.SetGuitarInCart, (guitar: Guitar) => ({ payload: guitar }));
export const setCartItem = createAction(ActionType.SetCartItem, (cartItem: CartItem) => ({ payload: cartItem }));
export const removeFromCart = createAction(ActionType.RemoveFromCart, (id: Guitar["id"]) => ({ payload: id }));
