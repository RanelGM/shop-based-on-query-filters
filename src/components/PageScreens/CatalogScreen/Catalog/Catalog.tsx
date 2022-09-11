import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getCurrentViewport } from "store/ui/selectors";
import useModal from "hooks/useModal";
import { Guitar } from "types/guitar";
import { Button } from "components/Common/Button/Button";
import { Icon } from "components/Common/Icon/Icon";
import { FilterSortModal } from "components/Modals/FilterSortModal/FilterSortModal";
import { Pagination } from "../Pagination/Pagination";
import { Filter } from "./Filter/Filter";
import { GuitarCard } from "./GuitarCard/GuitarCard";
import { Sort } from "./Sort/Sort";
import { Query } from "utils/constants";
import style from "./Catalog.module.scss";

type CatalogProps = {
  guitars: Guitar[] | null;
};

const getFilterIcon = (isFilterActive: boolean) => {
  // Если применён фильтр, то иконка будет закрашена
  return <Icon iconName={isFilterActive ? "filter" : "filter-empty"} className={style.filterIcon} />;
};

const getSortIcon = (isSortActive: boolean) => {
  // Если применена сортировка, то иконка будет закрашена
  return (
    <div className={style.sortIcons}>
      <Icon iconName={isSortActive ? "triangle" : "triangle-empty"} />
      <Icon iconName={isSortActive ? "triangle" : "triangle-empty"} />
    </div>
  );
};

export const Catalog = (props: CatalogProps) => {
  const { guitars } = props;
  const { isMobileVp, isDesktopVp } = useSelector(getCurrentViewport);
  const [isFilterModalOpen, filterModalCallbacks] = useModal({});
  const [isSortModalOpen, sortModalCallbacks] = useModal({});

  const [searchParams] = useSearchParams();
  const isSortActive = Array.from(searchParams.entries()).some(([key]) => key === Query.Sort || key === Query.Order);
  const isFilterActive = Array.from(searchParams.entries()).some(
    ([key]) => key === Query.PriceFrom || key === Query.PriceTo || key === Query.Type || key === Query.String,
  );

  useEffect(() => {
    // Кнопка фильтров и его попап доступны только на недесктопном вьюпорте
    if (isDesktopVp && isFilterModalOpen) {
      filterModalCallbacks.closeModal();
    }

    // Кнопка сортировки и его попап доступны только на мобильном вьюпорте
    if (!isMobileVp && isSortModalOpen) {
      sortModalCallbacks.closeModal();
    }
  }, [isDesktopVp, isMobileVp, isFilterModalOpen, filterModalCallbacks, isSortModalOpen, sortModalCallbacks]);

  return (
    <>
      {isFilterModalOpen && (
        <FilterSortModal onModalClose={filterModalCallbacks.closeModal}>
          <Filter />
        </FilterSortModal>
      )}
      {isSortModalOpen && (
        <FilterSortModal onModalClose={sortModalCallbacks.closeModal}>
          <Sort />
        </FilterSortModal>
      )}

      <section className={style.component}>
        {isDesktopVp && <Filter />}

        <div className={style.catalogWrapper}>
          <div className={style.filtersWrapper}>
            {!isDesktopVp && (
              <Button
                icon={getFilterIcon(isFilterActive)}
                className={style.filterButton}
                color="white-black"
                onClick={filterModalCallbacks.openModal}
              >
                Фильтры
              </Button>
            )}

            {isMobileVp ? (
              <Button
                icon={getSortIcon(isSortActive)}
                className={style.filterButton}
                color="white-black"
                onClick={sortModalCallbacks.openModal}
              >
                Сортировка
              </Button>
            ) : (
              <Sort />
            )}
          </div>
          <ul className={style.guitarsList}>
            {guitars &&
              guitars.map((guitar) => (
                <li key={guitar.id}>
                  <GuitarCard guitar={guitar} />
                </li>
              ))}
          </ul>
          <Pagination />
        </div>
      </section>
    </>
  );
};
