import cn from "classnames";
import { Icon } from "components/Common/Icon/Icon";
import style from "./Sort.module.scss";

export const Sort = () => {
  return (
    <div className={style.component}>
      <h2 className={style.heading}>Сортировать:</h2>
      <div className={style.buttonsWrapper}>
        <button className={cn(style.button, style["button--type"])} type="button">
          <span className={style.buttonText}>по цене</span>
        </button>
        <button className={cn(style.button, style["button--type"])} type="button">
          <span className={style.buttonText}>по популярности</span>
        </button>
      </div>
      <div className={cn(style.buttonsWrapper, style["buttonsWrapper--order"])}>
        <button className={cn(style.button, style["button--order"])} type="button">
          <span className={style.buttonText}>по возрастанию</span>
          <Icon className={style.icon} iconName="triangle" />
        </button>
        <button className={cn(style.button, style["button--order"])} type="button">
          <span className={style.buttonText}>по убыванию</span>
          <Icon className={cn(style.icon, style["icon--down"])} iconName="triangle" />
        </button>
      </div>
    </div>
  );
};
