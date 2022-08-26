import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Icon } from "../Icon/Icon";
import { Positioner } from "../Positioner/Positioner";
import { SearchForm } from "../SearchForm/SearchForm";
import { AppRoute, HEADER_NAV_LINKS } from "utils/constants";
import logo from "assets/img/content/logo.svg";
import style from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={style.component}>
      <Positioner>
        <Link className={style.logo} to={"/"}>
          <img src={logo} width="70" height="70" alt="Логотип" />
        </Link>

        <nav>
          <ul className={style.navList}>
            {HEADER_NAV_LINKS.map((link) => (
              <li className={style.navItem} key={link.id}>
                <NavLink className={style.navLink} to={link.path}>
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <SearchForm className={style.searchForm} />

        <Link className={style.cart} to={AppRoute.Cart}>
          <Icon iconName="cart" />
          {/* <span className={style.cartCount}></span> */}
        </Link>
      </Positioner>
    </header>
  );
};
