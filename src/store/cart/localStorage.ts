import { CartItem, Discount } from "types/cart";

const CART_TOKEN = "guitars_cart";
const DISCOUNT_TOKEN = "guitars_discount";

export const setLocalStorageCart = (cart: CartItem[]) => {
  localStorage.setItem(CART_TOKEN, JSON.stringify(cart));
};

export const getLocalStorageCart = (): CartItem[] | null => {
  const cart = localStorage.getItem(CART_TOKEN);
  return cart ? JSON.parse(cart) : null;
};

export const setLocalStorageDiscount = (discount: Discount) => {
  localStorage.setItem(DISCOUNT_TOKEN, JSON.stringify(discount));
};

export const getLocalStorageDiscount = (): Discount | null => {
  const discount = localStorage.getItem(DISCOUNT_TOKEN);
  return discount ? JSON.parse(discount) : null;
};
