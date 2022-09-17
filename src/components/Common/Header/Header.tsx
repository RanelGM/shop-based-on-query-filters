import { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import cn from "classnames";
import { getCartCount } from "store/cart/selectors";
import { setSearch } from "store/guitar/actions";
import { loadSearchGuitars } from "store/guitar/asyncActions";
import { getSearchOptions } from "store/guitar/selectors";
import { getCurrentViewport } from "store/ui/selectors";
import { useAsyncDispatch } from "hooks/useAsyncDispatch";
import { useDebounce } from "hooks/useDebounce";
import { Icon } from "../Icon/Icon";
import { Positioner } from "../Positioner/Positioner";
import { SearchForm } from "../SearchForm/SearchForm";
import { Navigation } from "./Navigation/Navigation";
import { AppRoute, Viewport } from "utils/constants";
import logo from "assets/img/content/logo.svg";
import style from "./Header.module.scss";

export const Header = () => {
  const { isMobileVp, currentViewport } = useSelector(getCurrentViewport);
  const prevViewPortRef = useRef<Viewport>(currentViewport);
  const searchOptions = useSelector(getSearchOptions);
  const [isSearchInputShow, setIsSearchInputShow] = useState(!isMobileVp);

  // Отражает общее количество товаров (в т.ч. сумму их amount)
  const cartCount = useSelector(getCartCount);

  // На мобильном разрешении в случае, если открыто окно поиска, лого - не показывается
  const isLogoShow = !isSearchInputShow;
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  const [_status, loadSimilar] = useAsyncDispatch({ onLoad: (searchValue: string) => loadSearchGuitars(searchValue) });
  // Использует задержку для введённого значения
  const [debounceLoad, resetDebounce] = useDebounce({ callback: (value: string) => loadSimilar(value), timeout: 1000 });
  const dispatch = useDispatch();

  const resetSearch = useCallback(() => {
    // Сброс всех значений поиска
    setIsSearchInputShow(false);
    dispatch(setSearch(null));

    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
  }, [dispatch]);

  useEffect(() => {
    // Сбрасывает все значения поиска при смене вьюпорта
    resetSearch();
    prevViewPortRef.current = currentViewport;
  }, [currentViewport, resetSearch]);

  const onSearchInputChange = ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    const value = currentTarget.value;

    if (value) {
      debounceLoad(value);
    } else {
      dispatch(setSearch(null));
      resetDebounce();
    }
  };

  const onSearchButtonClick = (evt: FormEvent) => {
    evt.preventDefault();

    if (!isMobileVp) {
      // Используется только на мобильных разрешениях
      return;
    }

    if (isSearchInputShow) {
      // Повторное нажание на кнопку поиска - сбрасывает все значения, закрывает форму поиска
      resetSearch();
      return;
    }

    setIsSearchInputShow(true);

    setTimeout(() => {
      // Использует event loop, чтобы корректно навесить фокус на инпут, т.к. до смены стейта он display: none
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

            {cartCount > 0 && <span className={style.cartCount}>{cartCount}</span>}
          </Link>
        </Positioner>
      </header>
    </>
  );
};
