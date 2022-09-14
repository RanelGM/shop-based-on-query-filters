import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import cn from "classnames";
import { setSearch } from "store/guitar/actions";
import { loadSearchGuitars } from "store/guitar/asyncActions";
import { getSearchOptions } from "store/guitar/selectors";
import { getCurrentViewport } from "store/ui/selectors";
import { useAsyncDispatch } from "hooks/useAsyncDispatch";
import { Icon } from "../Icon/Icon";
import { Positioner } from "../Positioner/Positioner";
import { SearchForm } from "../SearchForm/SearchForm";
import { Navigation } from "./Navigation/Navigation";
import { AppRoute } from "utils/constants";
import logo from "assets/img/content/logo.svg";
import style from "./Header.module.scss";

export const Header = () => {
  const { isMobileVp } = useSelector(getCurrentViewport);
  const searchOptions = useSelector(getSearchOptions);
  const [isSearchInputShow, setIsSearchInputShow] = useState(!isMobileVp);
  const isLogoShow = !isSearchInputShow;
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const [_status, loadSimilar] = useAsyncDispatch({ onLoad: (searchValue: string) => loadSearchGuitars(searchValue) });
  const dispatch = useDispatch();

  useEffect(() => {
    // Сбрасывает открытое окно поиска в случае, если это не мобильный вьюпорт
    if (!isMobileVp && isSearchInputShow) {
      setIsSearchInputShow(false);
    }
  }, [isMobileVp, isSearchInputShow]);

  const onSearchInputChange = ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    const value = currentTarget.value;

    if (value) {
      loadSimilar(value);
    } else {
      dispatch(setSearch(null));
    }
  };

  const onSearchButtonClick = (evt: FormEvent) => {
    evt.preventDefault();

    if (!isMobileVp) {
      return;
    }

    setIsSearchInputShow(true);

    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 0);
  };

  const onSearchOptionClick = () => {
    dispatch(setSearch(null));
  };

  return (
    <>
      <header className={style.component}>
        <Positioner className={style.positioner}>
          <>
            {isLogoShow && (
              <Link className={cn(style.logo)} to={AppRoute.Main}>
                <img src={logo} width="70" height="70" alt="Логотип" />
              </Link>
            )}
          </>

          <Navigation />

          <SearchForm
            className={cn(style.searchForm, isSearchInputShow && style["searchForm--show"])}
            options={searchOptions || undefined}
            inputRef={searchInputRef}
            onChange={onSearchInputChange}
            onSubmit={onSearchButtonClick}
            onOptionClick={onSearchOptionClick}
          />

          <Link className={style.cart} to={AppRoute.Cart}>
            <Icon className={style.cartIcon} iconName="cart" />
            {/* <span className={style.cartCount}></span> */}
          </Link>
        </Positioner>
      </header>
    </>
  );
};
