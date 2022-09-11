import { RootReducerState } from "store/store";
import { Guitar, Price } from "types/guitar";

export const getGuitars = (state: RootReducerState): Guitar[] | null => state.guitar.guitars;
export const getGuitar = (state: RootReducerState): Guitar | null => state.guitar.guitar;
export const getPrice = (state: RootReducerState): Price => state.guitar.price;
