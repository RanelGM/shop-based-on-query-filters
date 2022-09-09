import { MouseEvent } from "react";
import { useSearchParams } from "react-router-dom";
import cn from "classnames";
import { Icon } from "components/Common/Icon/Icon";
import { SortType, Query, SORT_TYPES, SORT_ORDERS } from "utils/constants";
import style from "./Sort.module.scss";

export const Sort = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSortType = searchParams.get(Query.Sort);
  const activeSortOrder = searchParams.get(Query.Order);

  const onSortTypeButtonClick = ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    searchParams.set(Query.Sort, currentTarget.id);
    setSearchParams(searchParams);
  };

  const onSortOrderButtonClick = ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    searchParams.set(Query.Order, currentTarget.id);

    if (!searchParams.has(Query.Sort)) {
      // В случае, если не было выбрано сортировки по типу, то по умолчанию установится "по цене"
      searchParams.set(Query.Sort, SortType.Price);
    }

    setSearchParams(searchParams);
  };

  return (
    <div className={style.component}>
      <h2 className={style.heading}>Сортировать:</h2>
      <div className={style.buttonsWrapper}>
        {SORT_TYPES.map((item) => (
          <button
            key={item.id}
            id={item.id}
            className={cn(style.button, style["button--type"])}
            type="button"
            onClick={onSortTypeButtonClick}
          >
            <span className={cn(style.buttonText, activeSortType === item.type && style["buttonText--active"])}>
              {item.label}
            </span>
          </button>
        ))}
      </div>
      <div className={cn(style.buttonsWrapper, style["buttonsWrapper--order"])}>
        {SORT_ORDERS.map((item) => (
          <button
            key={item.id}
            id={item.id}
            className={cn(style.button, style["button--order"])}
            type="button"
            onClick={onSortOrderButtonClick}
          >
            <span className={cn(style.buttonText, activeSortOrder === item.type && style["buttonText--active"])}>
              {item.label}
            </span>
            <Icon
              className={cn(
                style.icon,
                style[`icon--${item.type}`],
                activeSortOrder === item.type && style["icon--active"],
              )}
              iconName="triangle"
            />
          </button>
        ))}
      </div>
    </div>
  );
};
