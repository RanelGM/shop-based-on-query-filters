import { RootReducerState } from "store/store";
import { CartItem } from "types/cart";

export const getCart = (state: RootReducerState): CartItem[] => state.cart.cart;

export const getCartCount = (state: RootReducerState): number =>
  state.cart.cart.reduce((accum, cartItem) => {
    return accum + cartItem.amount;
  }, 0);
