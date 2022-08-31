import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import { useBodyScrollLock } from "hooks/useBodyScrollLock";
import { useViewport } from "hooks/useViewport";
import { HEADER_NAV_LINKS } from "utils/constants";
import style from "./Navigation.module.scss";

export const Navigation = () => {
  const { isMobileViewport } = useViewport();
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const onNavMenuToggle = () => setIsNavMenuOpen((prevState) => !prevState);

  // Отключает скролл у body если меню открыто
  useBodyScrollLock({ condition: isNavMenuOpen });

  useEffect(() => {
    // Сбрасывает открытое окно навигации в случае, если это не мобильный вьюпорт
    if (!isMobileViewport && isNavMenuOpen) {
      setIsNavMenuOpen(false);
    }
  }, [isMobileViewport, isNavMenuOpen]);

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
