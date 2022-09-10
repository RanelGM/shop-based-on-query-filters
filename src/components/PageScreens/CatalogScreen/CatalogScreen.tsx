import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { loadGuitars } from "store/guitar/asyncActions";
import { getGuitars } from "store/guitar/selectors";
import { useAsyncDispatch } from "hooks/useAsyncDispatch";
import { Loader } from "components/Common/Loader/Loader";
import { Positioner } from "components/Common/Positioner/Positioner";
import { Catalog } from "./Catalog/Catalog";
import style from "./CatalogScreen.module.scss";

export const CatalogScreen = () => {
  const currentPage = useParams().page;
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const guitars = useSelector(getGuitars);
  const [status, , resetStatus] = useAsyncDispatch({
    onLoad: () => loadGuitars(Number(currentPage), searchParams),
    isLoadImmediate: true,
  });

  useEffect(() => {
    // Повторно загружает данные при смене страницы каталога (pathname) или search параметров
    resetStatus();
  }, [pathname, searchParams, resetStatus]);

  return (
    <Positioner>
      <> {status.isLoading && <Loader />}</>

      <h1 className={style.heading}>Каталог гитар</h1>
      <Catalog guitars={guitars} />
    </Positioner>
  );
};
