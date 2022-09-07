import { AsyncActionResult } from "store/store";
import { Guitar } from "types/guitar";
import { setGuitars } from "./actions";
import { APIRoute, Query } from "utils/constants";

export const loadGuitars = (): AsyncActionResult => {
  return async (dispatch, _getState, axios) => {
    const { data } = await axios.get<Guitar[]>(`${APIRoute.Guitars}?${Query.EmbedComments}`);
    dispatch(setGuitars(data));
  };
};
