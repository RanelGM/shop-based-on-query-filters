import { RootReducerState } from "store/store";
import { CartItem } from "types/cart";

export const getCart = (state: RootReducerState): CartItem[] => state.cart.cart;
