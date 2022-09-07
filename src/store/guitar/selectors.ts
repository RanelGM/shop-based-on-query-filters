import { RootReducerState } from "store/store";
import { Guitar } from "types/guitar";

export const getGuitars = (state: RootReducerState): Guitar[] | null => state.guitar.guitars;
export const getGuitar = (state: RootReducerState): Guitar | null => state.guitar.guitar;
