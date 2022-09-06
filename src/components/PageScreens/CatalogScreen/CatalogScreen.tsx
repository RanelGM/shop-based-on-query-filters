import { useViewport } from "hooks/useViewport";
import { Positioner } from "components/Common/Positioner/Positioner";
import { Catalog } from "./Catalog/Catalog";
import { Filter } from "./Filter/Filter";
import style from "./CatalogScreen.module.scss";

export const CatalogScreen = () => {
  // В случае tablet, mobile viewport Фильтр будет внутри коммпонента Catalog
  const { isDesktopViewport } = useViewport();

  return (
    <Positioner>
      <h1 className={style.heading}>Каталог гитар</h1>
      <div className={style.catalogWrapper}>
        {isDesktopViewport && <Filter />}
        <Catalog />
      </div>
    </Positioner>
  );
};
