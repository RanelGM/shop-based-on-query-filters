import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { createSearchParams, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { loadGuitars } from "store/guitar/asyncActions";
import { getGuitars } from "store/guitar/selectors";
import { useAsyncDispatch } from "hooks/useAsyncDispatch";
import { Loader } from "components/Common/Loader/Loader";
import { Positioner } from "components/Common/Positioner/Positioner";
import { Catalog } from "./Catalog/Catalog";
import { AppRoute } from "utils/constants";
import style from "./CatalogScreen.module.scss";

export const CatalogScreen = () => {
  const currentPage = Number(useParams().page);
  const [searchParams] = useSearchParams();
  const prevParamsRef = useRef(searchParams.toString());
  const navigateTo = useNavigate();

  const guitars = useSelector(getGuitars);
  const [status, , resetStatus] = useAsyncDispatch({
    onLoad: () => loadGuitars(currentPage, searchParams),
    isLoadImmediate: true,
  });

  useEffect(() => {
    // Повторно загружает данные при смене страницы каталога (currentPage) или search параметров
    resetStatus();
  }, [currentPage, searchParams, resetStatus]);

  useEffect(() => {
    // Перенаправляет на первую страницу при смене search параметров
    if (prevParamsRef.current !== searchParams.toString()) {
      const search = createSearchParams(searchParams).toString();
      prevParamsRef.current = searchParams.toString();

      navigateTo({
        pathname: `${AppRoute.Catalog}/1`,
        search: search,
      });
    }
  }, [navigateTo, searchParams]);

  return (
    <Positioner>
      <> {status.isLoading && <Loader />}</>

      <h1 className={style.heading}>Каталог гитар</h1>
      <Catalog guitars={guitars} />
    </Positioner>
  );
};
