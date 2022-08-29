import { useState } from "react";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import { HEADER_NAV_LINKS } from "utils/constants";
import style from "./Navigation.module.scss";

export const Navigation = () => {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

  const onNavMenuToggle = () => setIsNavMenuOpen((prevState) => !prevState);

  return (
    <div className={cn(style.component, isNavMenuOpen && style["component--open"])}>
      <button className={style.navButton} onClick={onNavMenuToggle}>
        <div>
          <span className={style.navButtonIcon} />
        </div>
      </button>
      <nav className={style.navigation}>
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
    </div>
  );
};
