import { RootReducerState } from "store/store";
import { Viewport } from "utils/constants";

export const getCurrentViewport = (state: RootReducerState): Viewport => state.ui.currentViewport;
