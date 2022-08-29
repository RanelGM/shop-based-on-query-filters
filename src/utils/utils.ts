import { ViewPortMaxWidth } from "./constants";

export const checkIsMobileViewport = () => window.innerWidth <= ViewPortMaxWidth.Mobile;
