import { createAction } from "@reduxjs/toolkit";
import { CartItem, Discount } from "types/cart";
import { Guitar } from "types/guitar";

enum ActionType {
  SetGuitarInCart = "cart/setGuitarInCart",
  SetCartItem = "cart/setCartItem",
  RemoveFromCart = "cart/removeFromCart",
  SetDiscount = "cart/setDiscount",
}

export const setGuitarInCart = createAction(ActionType.SetGuitarInCart, (guitar: Guitar) => ({ payload: guitar }));
export const setCartItem = createAction(ActionType.SetCartItem, (cartItem: CartItem) => ({ payload: cartItem }));
export const removeFromCart = createAction(ActionType.RemoveFromCart, (id: Guitar["id"]) => ({ payload: id }));
export const setDiscount = createAction(ActionType.SetDiscount, (discount: Discount) => ({ payload: discount }));
