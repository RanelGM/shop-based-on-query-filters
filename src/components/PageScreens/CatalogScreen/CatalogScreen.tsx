import { Positioner } from "components/Common/Positioner/Positioner";
import { Catalog } from "./Catalog/Catalog";
import { Filter } from "./Filter/Filter";
import style from "./CatalogScreen.module.scss";

export const CatalogScreen = () => {
  return (
    <Positioner>
      <h1 className={style.heading}>Каталог гитар</h1>
      <div className={style.catalogWrapper}>
        <Filter />
        <Catalog />
      </div>
    </Positioner>
  );
};
