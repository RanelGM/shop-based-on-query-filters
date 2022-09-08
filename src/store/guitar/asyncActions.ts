import { AsyncActionResult } from "store/store";
import { setPaginationCount } from "store/ui/actions";
import { Guitar } from "types/guitar";
import { setGuitars } from "./actions";
import { APIRoute, MAX_GUITARS_FOR_PAGE, PAGINATION_COUNT_HEADER } from "utils/constants";

export const loadGuitars = (currentPage: number): AsyncActionResult => {
  return async (dispatch, _getState, axios) => {
    const limit = `&_start=${(currentPage - 1) * MAX_GUITARS_FOR_PAGE}&_limit=${MAX_GUITARS_FOR_PAGE}`;

    const { data, headers } = await axios.get<Guitar[]>(`${APIRoute.Guitars}?_embed=comments${limit}`);

    dispatch(setGuitars(data));
    dispatch(setPaginationCount(Number(headers[PAGINATION_COUNT_HEADER]) / MAX_GUITARS_FOR_PAGE));
  };
};
