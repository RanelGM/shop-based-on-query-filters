import { useEffect } from "react";
import useModal from "hooks/useModal";
import { useViewport } from "hooks/useViewport";
import { Button } from "components/Common/Button/Button";
import { Icon } from "components/Common/Icon/Icon";
import { FilterSortModal } from "components/Modals/FilterSortModal/FilterSortModal";
import { Pagination } from "../Pagination/Pagination";
import { Filter } from "./Filter/Filter";
import { GuitarCard } from "./GuitarCard/GuitarCard";
import { Sort } from "./Sort/Sort";
import style from "./Catalog.module.scss";

const mockGuitarCount = 9;

export const Catalog = () => {
  const { isDesktopVp, isMobileVp } = useViewport();
  const [isFilterModalOpen, filterModalCallbacks] = useModal({});
  const [isSortModalOpen, sortModalCallbacks] = useModal({});

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
                icon={<Icon iconName="filter" />}
                className={style.filterButton}
                color="white-black"
                onClick={filterModalCallbacks.openModal}
              >
                Фильтры
              </Button>
            )}

            {isMobileVp ? (
              <Button className={style.filterButton} color="white-black" onClick={sortModalCallbacks.openModal}>
                Сортировка
              </Button>
            ) : (
              <Sort />
            )}
          </div>
          <ul className={style.guitarsList}>
            {Array.from({ length: mockGuitarCount }, (item, index) => (
              <li key={index}>
                <GuitarCard />
              </li>
            ))}
          </ul>
          <Pagination />
        </div>
      </section>
    </>
  );
};
