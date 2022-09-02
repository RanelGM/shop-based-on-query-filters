import cn from "classnames";
import { ButtonLink } from "components/Common/ButtonLink/ButtonLink";
import { AppRoute } from "utils/constants";
import style from "./Pagination.module.scss";

const MOCK_PAGES = [1, 2, 3];
const mockActivePage = 2;

export const Pagination = () => {
  return (
    <section className={style.component}>
      <ul className={style.list}>
        <li>
          <ButtonLink
            className={cn(style.buttonLink, style["buttonLink--prev"])}
            to={`${AppRoute.Catalog}/${mockActivePage - 1}`}
            color="white-black"
          >
            Назад
          </ButtonLink>
        </li>

        {MOCK_PAGES.map((page) => (
          <li key={page}>
            <ButtonLink
              className={cn(style.buttonLink, page === mockActivePage && style["buttonLink--active"])}
              to={`${AppRoute.Catalog}/${page}`}
              color="white-black"
            >
              {page}
            </ButtonLink>
          </li>
        ))}

        <li>
          <ButtonLink
            className={cn(style.buttonLink, style["buttonLink--next"])}
            to={`${AppRoute.Catalog}/${mockActivePage + 1}`}
            color="white-black"
          >
            Далее
          </ButtonLink>
        </li>
      </ul>
    </section>
  );
};
