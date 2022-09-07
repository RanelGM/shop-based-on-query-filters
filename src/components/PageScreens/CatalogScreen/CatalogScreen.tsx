import { useSelector } from "react-redux";
import { loadGuitars } from "store/guitar/asyncActions";
import { getGuitars } from "store/guitar/selectors";
import { useAsyncDispatch } from "hooks/useAsyncDispatch";
import { Positioner } from "components/Common/Positioner/Positioner";
import { Catalog } from "./Catalog/Catalog";
import style from "./CatalogScreen.module.scss";

export const CatalogScreen = () => {
  const guitars = useSelector(getGuitars);
  const [status] = useAsyncDispatch({ onLoad: () => loadGuitars(), isLoadImmediate: true });

  return (
    <Positioner>
      <h1 className={style.heading}>Каталог гитар</h1>
      <Catalog guitars={guitars} isLoading={status.isLoading} />
    </Positioner>
  );
};
