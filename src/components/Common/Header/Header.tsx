import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentViewport } from "store/ui/selectors";
import useModal from "hooks/useModal";
import { SearchFormModal } from "components/Modals/SearchFormModal/SearchFormModal";
import { Icon } from "../Icon/Icon";
import { Positioner } from "../Positioner/Positioner";
import { SearchForm } from "../SearchForm/SearchForm";
import { Navigation } from "./Navigation/Navigation";
import { AppRoute } from "utils/constants";
import logo from "assets/img/content/logo.svg";
import style from "./Header.module.scss";

export const Header = () => {
  const { isMobileVp } = useSelector(getCurrentViewport);

  // На мобильных устройства рендерится иконка поиска, при клике на которую появляется модальное окно поиска
  const [isModalOpen, modalCallbacks] = useModal({});

  useEffect(() => {
    // Сбрасывает открытое окно поиска в случае, если это не мобильный вьюпорт
    if (!isMobileVp && isModalOpen) {
      modalCallbacks.closeModal();
    }
  }, [isMobileVp, isModalOpen, modalCallbacks]);

  const onSearchButtonClick = () => {
    modalCallbacks.openModal();
  };

  return (
    <>
      {isModalOpen && <SearchFormModal onModalClose={modalCallbacks.closeModal} />}

      <header className={style.component}>
        <Positioner className={style.positioner}>
          <Link className={style.logo} to={"/"}>
            <img src={logo} width="70" height="70" alt="Логотип" />
          </Link>

          <Navigation />

          {isMobileVp ? (
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
