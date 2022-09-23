import { Guitar } from "./guitar";

export type CartItem = Guitar & {
  amount: number;
};

export type Discount = {
  coupon: string;
  discount: number;
};
