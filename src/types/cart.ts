import { Guitar } from "./guitar";

export type CartItem = Guitar & {
  amount: number;
};
