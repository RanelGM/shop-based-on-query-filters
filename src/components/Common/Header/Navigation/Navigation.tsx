import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import { getCurrentViewport } from "store/ui/selectors";
import { useBodyScrollLock } from "hooks/useBodyScrollLock";
import { HEADER_NAV_LINKS } from "utils/constants";
import style from "./Navigation.module.scss";

export const Navigation = () => {
  const { isMobileVp } = useSelector(getCurrentViewport);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const onNavMenuToggle = () => setIsNavMenuOpen((prevState) => !prevState);

  // Отключает скролл у body если меню открыто
  useBodyScrollLock({ condition: isNavMenuOpen });

  useEffect(() => {
    // Сбрасывает открытое окно навигации в случае, если это не мобильный вьюпорт
    if (!isMobileVp && isNavMenuOpen) {
      setIsNavMenuOpen(false);
    }
  }, [isMobileVp, isNavMenuOpen]);

  const onNavButtonClick = () => {
    if (isMobileVp) {
      setIsNavMenuOpen(false);
    }
  };

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
              <NavLink className={style.navLink} to={link.path} onClick={onNavButtonClick}>
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
