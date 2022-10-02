import { createAction } from "@reduxjs/toolkit";
import { City, Shop } from "types/shop";

enum ActionType {
  SetShops = "shop/setShops",
  SetUserCity = "shop/setUserCity",
}

export const setShops = createAction(ActionType.SetShops, (shops: Shop[]) => ({ payload: shops }));
export const setUserCity = createAction(ActionType.SetUserCity, (city: City) => ({ payload: city }));
