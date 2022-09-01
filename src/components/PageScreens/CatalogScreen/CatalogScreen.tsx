import { Positioner } from "components/Common/Positioner/Positioner";
import { Filter } from "./Filter/Filter";
import style from "./CatalogScreen.module.scss";

export const CatalogScreen = () => {
  return (
    <Positioner>
      <h1 className={style.heading}>Каталог гитар</h1>
      <Filter />
    </Positioner>
  );
};
