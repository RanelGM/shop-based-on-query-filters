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
  const { isDesktopViewport, isMobileViewport } = useViewport();
  const [isFilterModalOpen, filterModalCallbacks] = useModal({});
  const [isSortModalOpen, sortModalCallbacks] = useModal({});

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
        {isDesktopViewport && <Filter />}

        <div className={style.catalogWrapper}>
          <div className={style.filtersWrapper}>
            {!isDesktopViewport && (
              <Button
                icon={<Icon iconName="filter" />}
                className={style.filterButton}
                color="white-black"
                onClick={filterModalCallbacks.openModal}
              >
                Фильтры
              </Button>
            )}

            {isMobileViewport ? (
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
