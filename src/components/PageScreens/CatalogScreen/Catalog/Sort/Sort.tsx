import { MouseEvent, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import cn from "classnames";
import { getCurrentViewport } from "store/ui/selectors";
import { Button } from "components/Common/Button/Button";
import { Icon } from "components/Common/Icon/Icon";
import { Query, SORT_TYPES, SORT_ORDERS, SortOrder, SortType } from "utils/constants";
import style from "./Sort.module.scss";

type SortProps = {
  onModalClose: () => void;
};

type SortState = {
  [Query.Sort]: string | null;
  [Query.Order]: string | null;
};

const getDefaultState = (searchParams: URLSearchParams): SortState => ({
  [Query.Sort]: searchParams.get(Query.Sort),
  [Query.Order]: searchParams.get(Query.Order),
});

export const Sort = (props: SortProps) => {
  const { onModalClose } = props;
  const { isMobileVp } = useSelector(getCurrentViewport);
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useState<SortState>(getDefaultState(searchParams));
  const activeSortType = state[Query.Sort];
  const activeSortOrder = state[Query.Order];

  const updateSearchParams = useCallback(() => {
    Object.entries(state).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value);
      }
    });

    setSearchParams(searchParams);
  }, [searchParams, setSearchParams, state]);

  useEffect(() => {
    // Записывает state в searchParams при перендере компонента
    // На мобильных устройствах searchParams устанавливаются по кнопке "Применить"
    if (!isMobileVp) {
      updateSearchParams();
    }
  }, [isMobileVp, updateSearchParams]);

  const onSortTypeButtonClick = ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    setState((prevState) => ({
      [Query.Sort]: currentTarget.id,
      // В случае, если ранее не был выбран порядок сортировки, то установится "По убыванию"
      [Query.Order]: prevState[Query.Order] ? prevState[Query.Order] : SortOrder.Desc,
    }));
  };

  const onSortOrderButtonClick = ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    setState((prevState) => ({
      [Query.Order]: currentTarget.id,
      // В случае, если ранее не был выбран тип сортировки, то установится "По цене"
      [Query.Sort]: prevState[Query.Sort] ? prevState[Query.Sort] : SortType.Price,
    }));
  };

  const onSubmitButtonClick = () => {
    updateSearchParams();
    onModalClose();
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

      {isMobileVp && (
        <Button className={style.buttonSubmit} color="white-black" onClick={onSubmitButtonClick}>
          Применить
        </Button>
      )}
    </div>
  );
};
