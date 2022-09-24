import { RootReducerState } from "store/store";
import { Price, Option } from "types/common";
import { Guitar } from "types/guitar";

export const getGuitars = (state: RootReducerState): Guitar[] | null => state.guitar.guitars;

export const getGuitar = (state: RootReducerState): Guitar | null => {
  const guitar = state.guitar.guitar;

  if (!guitar) {
    return null;
  }

  // Сортирует комментарии по дате создания - от самых новых к старым
  return {
    ...guitar,
    comments: guitar.comments
      .slice()
      .sort((first, second) => new Date(first.createAt).getTime() - new Date(second.createAt).getTime())
      .reverse(),
  };
};

export const getPrice = (state: RootReducerState): Price => state.guitar.price;

export const getSearchOptions = (state: RootReducerState): Option[] | null => {
  const searchGuitars = state.guitar.search;

  if (!searchGuitars) {
    return null;
  }

  return searchGuitars.map((guitar) => ({ id: `${guitar.id}`, value: guitar.name }));
};
