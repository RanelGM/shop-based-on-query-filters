import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadGuitar } from "store/guitar/asyncActions";
import { getGuitar } from "store/guitar/selectors";
import { useAsyncDispatch } from "hooks/useAsyncDispatch";
import { Loader } from "components/Common/Loader/Loader";
import { Positioner } from "components/Common/Positioner/Positioner";
import { Product } from "./Product/Product";
import style from "./ProductScreen.module.scss";

export const ProductScreen = () => {
  const guitarId = useParams().id as string;
  const guitar = useSelector(getGuitar);

  const [status, , resetStatus] = useAsyncDispatch({
    onLoad: () => loadGuitar(guitarId),
    isLoadImmediate: true,
  });

  useEffect(() => {
    // Сбрасывает статус загрузки при смене id (когда используется поиск в шапке)
    resetStatus();
  }, [guitarId, resetStatus]);

  return (
    <Positioner>
      <>{status.isLoading && <Loader />}</>

      <h1 className={style.heading}>Товар</h1>

      <>{status.isSuccess && guitar && <Product guitar={guitar} />}</>
    </Positioner>
  );
};
