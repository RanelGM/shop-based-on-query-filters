import { RootReducerState } from "store/store";
import { City, Shop } from "types/shop";

export const getShops = (state: RootReducerState): Shop[] | null => state.shop.shops;
export const getUserCity = (state: RootReducerState): City | null => state.shop.userCity;
