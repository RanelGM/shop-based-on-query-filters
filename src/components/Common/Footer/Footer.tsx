import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import { Icon } from "../Icon/Icon";
import { Positioner } from "../Positioner/Positioner";
import { FOOTER_CONTACT_LINKS, FOOTER_NAV_LINKS } from "utils/constants";
import logo from "assets/img/content/logo.svg";
import style from "./Footer.module.scss";

export const Footer = () => {
  return (
    <footer className={style.footer}>
      <Positioner className={style.positioner}>
        <Link className={style.logo} to={"/"}>
          <img src={logo} width="70" height="70" alt="Логотип" />
        </Link>

        <div className={style.infoWrapper}>
          <div className={cn(style.info, style["info--about"])}>
            <h2>О нас</h2>
            <div>
              <p>Магазин гитар, музыкальных инструментов и гитарная мастерская в Москве, Казани и Санкт-Петербурге.</p>
              <p>Все инструменты проверены, отстроены и доведены до идеала!</p>
            </div>
          </div>
          <div className={style.info}>
            <h2>Полезные ссылки</h2>
            <nav>
              <ul className={style.list}>
                {FOOTER_NAV_LINKS.map((link) => (
                  <li className={style.navItem} key={link.id}>
                    <NavLink className={style.navLink} to={link.path}>
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className={style.info}>
            <h2>Контакты автора</h2>
            <nav>
              <ul className={cn(style.list, style["list--contacts"])}>
                {FOOTER_CONTACT_LINKS.map((link) => (
                  <li key={link.id}>
                    <a
                      className={style.contactLink}
                      href={link.path}
                      target={"_blank"}
                      rel="noreferrer nofollow noopener"
                    >
                      <Icon iconName={link.icon} />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </Positioner>
    </footer>
  );
};
