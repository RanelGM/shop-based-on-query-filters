import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setViewport } from "store/ui/actions";
import { getCurrentViewport } from "store/ui/selectors";
import { Viewport } from "utils/constants";
import { checkViewport } from "utils/utils";

export const useViewport = () => {
  // Используется для проверки текущего вьюпорта и установления в store актуального значения
  // Возвращает объектом булевые значения текущего вьюпорта
  // Можно использовать и не на верхнем уровне App (внутри компонентов), resize происходит 1 раз
  const currentViewport = useSelector(getCurrentViewport);
  const dispatch = useDispatch();

  useEffect(() => {
    const updateViewport = () => {
      const viewport = checkViewport();

      if (viewport === currentViewport) {
        return;
      }

      dispatch(setViewport(viewport));
    };

    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, [currentViewport, dispatch]);

  return useMemo(() => {
    const isMobileViewport = currentViewport === Viewport.Mobile;
    const isTabletViewport = currentViewport === Viewport.Tablet;
    const isDesktopViewport = currentViewport === Viewport.Desktop;

    return { isMobileViewport, isTabletViewport, isDesktopViewport };
  }, [currentViewport]);
};
