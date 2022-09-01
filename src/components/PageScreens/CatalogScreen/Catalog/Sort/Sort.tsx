import cn from "classnames";
import { Icon } from "components/Common/Icon/Icon";
import style from "./Sort.module.scss";

export const Sort = () => {
  return (
    <div className={style.component}>
      <h2 className={style.heading}>Сортировать:</h2>
      <div>
        <button className={style.buttonText} type="button">
          по цене
        </button>
        <button className={style.buttonText} type="button">
          по популярности
        </button>
      </div>
      <div className={style.buttonIconWrapper}>
        <button className={style.buttonIcon} type="button">
          <Icon className={style.icon} iconName="triangle" />
        </button>
        <button className={cn(style.buttonIcon, style["buttonIcon--down"])} type="button">
          <Icon className={style.icon} iconName="triangle" />
        </button>
      </div>
    </div>
  );
};
