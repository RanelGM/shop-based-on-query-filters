import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useModal from "hooks/useModal";
import { SearchFormModal } from "components/Modals/SearchFormModal/SearchFormModal";
import { Icon } from "../Icon/Icon";
import { Positioner } from "../Positioner/Positioner";
import { SearchForm } from "../SearchForm/SearchForm";
import { Navigation } from "./Navigation/Navigation";
import { AppRoute } from "utils/constants";
import { checkIsMobileViewport } from "utils/utils";
import logo from "assets/img/content/logo.svg";
import style from "./Header.module.scss";

export const Header = () => {
  const [isMobileViewport, setIsMobileViewport] = useState<boolean>(checkIsMobileViewport());

  useEffect(() => {
    // Определяет текущей viewport и устанавливает isMobileViewport = true, если подходит под мобильный
    // В зависимости от этого, по разному рендерит кнопку поиска / компонент SearchForm
    const updateViewport = () => {
      setIsMobileViewport(checkIsMobileViewport());
    };

    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  // На мобильных устройства рендерится иконка поиска, при клике на которую появляется модальное окно поиска
  const [isModalOpen, modalCallbacks] = useModal({});

  const onSearchButtonClick = () => {
    modalCallbacks.openModal();
  };

  return (
    <>
      {isModalOpen && <SearchFormModal onModalClose={modalCallbacks.closeModal} />}

      <header className={style.component}>
        <Positioner>
          <Link className={style.logo} to={"/"}>
            <img src={logo} width="70" height="70" alt="Логотип" />
          </Link>

          <Navigation />

          {isMobileViewport ? (
            <button className={style.buttonSearch} type="button" onClick={onSearchButtonClick}>
              <Icon className={style.iconSearch} iconName="search" />
            </button>
          ) : (
            <SearchForm className={style.searchForm} />
          )}

          <Link className={style.cart} to={AppRoute.Cart}>
            <Icon iconName="cart" />
            {/* <span className={style.cartCount}></span> */}
          </Link>
        </Positioner>
      </header>
    </>
  );
};
