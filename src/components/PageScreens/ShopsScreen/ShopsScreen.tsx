import { useSelector } from "react-redux";
import { loadShops } from "store/shop/asyncActions";
import { getShops, getUserCity } from "store/shop/selectors";
import { useAsyncDispatch } from "hooks/useAsyncDispatch";
import { Loader } from "components/Common/Loader/Loader";
import { Positioner } from "components/Common/Positioner/Positioner";
import { Shops } from "./Shops/Shops";
import style from "./ShopsScreen.module.scss";

export const ShopsScreen = () => {
  const shops = useSelector(getShops);
  const userCity = useSelector(getUserCity);

  const [status] = useAsyncDispatch({ onLoad: loadShops, isLoadImmediate: true });

  return (
    <>
      {status.isLoading && <Loader />}

      <Positioner>
        <h1 className={style.heading}>Наши магазины</h1>

        <>{status.isSuccess && shops && userCity && <Shops shops={shops} userCity={userCity} />}</>
      </Positioner>
    </>
  );
};
