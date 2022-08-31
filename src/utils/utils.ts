import { Viewport, ViewportMaxWidth } from "./constants";

export const checkViewport = () => {
  const width = window.innerWidth;

  switch (true) {
    case width <= ViewportMaxWidth.Mobile:
      return Viewport.Mobile;
    case width > ViewportMaxWidth.Mobile && width <= ViewportMaxWidth.Tablet:
      return Viewport.Tablet;
    default:
      return Viewport.Desktop;
  }
};
