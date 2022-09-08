import { RootReducerState } from "store/store";
import { Viewport } from "utils/constants";

export const getCurrentViewport = (state: RootReducerState) => {
  const currentViewport = state.ui.currentViewport;

  return {
    currentViewport: currentViewport,
    isMobileVp: currentViewport === Viewport.Mobile,
    isTabletVp: currentViewport === Viewport.Tablet,
    isDesktopVp: currentViewport === Viewport.Desktop,
  };
};

export const getPaginationCount = (state: RootReducerState) => state.ui.paginationCount;
