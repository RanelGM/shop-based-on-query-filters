import { RootReducerState } from "store/store";
import { Price, Option } from "types/common";
import { Guitar } from "types/guitar";

export const getGuitars = (state: RootReducerState): Guitar[] | null => state.guitar.guitars;
export const getGuitar = (state: RootReducerState): Guitar | null => state.guitar.guitar;
export const getPrice = (state: RootReducerState): Price => state.guitar.price;
export const getSearchOptions = (state: RootReducerState): Option[] | null => {
  const searchGuitars = state.guitar.search;

  if (!searchGuitars) {
    return null;
  }

  return searchGuitars.map((guitar) => ({ id: `${guitar.id}`, value: guitar.name }));
};
