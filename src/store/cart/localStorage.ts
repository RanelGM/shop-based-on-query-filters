import { CartItem } from "types/cart";

const CART_TOKEN = "guitars_cart";

export const setLocalStorageCart = (cart: CartItem[]) => {
  localStorage.setItem(CART_TOKEN, JSON.stringify(cart));
};

export const getLocalStorageCart = (): CartItem[] | null => {
  const cart = localStorage.getItem(CART_TOKEN);
  return cart ? JSON.parse(cart) : null;
};
