import { AsyncActionResult } from "store/store";
import { setDiscount } from "./actions";
import { setLocalStorageDiscount } from "./localStorage";
import { APIRoute } from "utils/constants";

export const loadDiscount = (inputValue: string): AsyncActionResult => {
  return async (dispatch, _getState, axios) => {
    const { data } = await axios.post<number>(APIRoute.Coupons, { coupon: inputValue });
    const discount = { coupon: inputValue, discount: data };
    setLocalStorageDiscount(discount);
    dispatch(setDiscount(discount));
  };
};
