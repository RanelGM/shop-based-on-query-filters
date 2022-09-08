import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import cn from "classnames";
import { getPaginationCount } from "store/ui/selectors";
import { ButtonLink } from "components/Common/ButtonLink/ButtonLink";
import { AppRoute, MAX_PAGINATION_COUNT } from "utils/constants";
import style from "./Pagination.module.scss";

const getPages = (activePage: number, paginationCount: number): number[] | null => {
  const pages = Array.from({ length: paginationCount }, (item, index) => index + 1);
  const siblingCount = Math.floor(MAX_PAGINATION_COUNT / 2);

  const isAllPagesAvailable = pages.length <= MAX_PAGINATION_COUNT;
  const isPageNearStart = activePage === 1 || activePage - siblingCount <= 0;
  const isPageNearEnd = activePage + siblingCount > pages.length;

  switch (true) {
    case pages.length === 0:
      // Если нет доступных страниц, то возвращается null и компонент не рендерится
      return null;
    case isAllPagesAvailable:
      // Если количество доступных страниц меньше, чем максимальное число пагинаторов, то возвращаются все страницы
      return pages;
    case isPageNearStart:
      // Если условие выше не срабатывает (т.е. страниц не меньше, чем пагинаторов),
      // а также, если это первая страница или пагинация в начале (доступных соседей может быть больше, чем активная страница),
      // то доступно максимально допустимое количество пагинаторов, активная страница не центрируется
      return pages.slice(0, MAX_PAGINATION_COUNT);
    case isPageNearEnd:
      // Если пагинация подходит к концу, то активная страница не центрируется
      return pages.slice(paginationCount - MAX_PAGINATION_COUNT);
    default:
      // По умолчанию активная страница центрируется, слева и справа отображаются соседние страницы
      return pages.slice(activePage - 1 - siblingCount, activePage + siblingCount);
  }
};

export const Pagination = () => {
  const paginationCount = useSelector(getPaginationCount);
  const activePage = Number(useParams().page);
  const pages = getPages(activePage, paginationCount);

  const isPrevLinkShow = activePage > 1;
  const isNextLinkShow = activePage < paginationCount;

  return (
    <>
      {pages && (
        <section className={style.component}>
          <ul className={style.list}>
            {isPrevLinkShow && (
              <li>
                <ButtonLink
                  className={cn(style.buttonLink, style["buttonLink--prev"])}
                  to={`${AppRoute.Catalog}/${activePage - 1}`}
                  color="white-black"
                >
                  Назад
                </ButtonLink>
              </li>
            )}

            {pages.map((page) => (
              <li key={page}>
                <ButtonLink
                  className={cn(style.buttonLink, page === activePage && style["buttonLink--active"])}
                  to={`${AppRoute.Catalog}/${page}`}
                  color="white-black"
                >
                  {page}
                </ButtonLink>
              </li>
            ))}

            {isNextLinkShow && (
              <li>
                <ButtonLink
                  className={cn(style.buttonLink, style["buttonLink--next"])}
                  to={`${AppRoute.Catalog}/${activePage + 1}`}
                  color="white-black"
                >
                  Далее
                </ButtonLink>
              </li>
            )}
          </ul>
        </section>
      )}
    </>
  );
};
