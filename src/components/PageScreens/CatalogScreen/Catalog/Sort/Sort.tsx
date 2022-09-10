import { MouseEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import cn from "classnames";
import { getCurrentViewport } from "store/ui/selectors";
import { Button } from "components/Common/Button/Button";
import { Icon } from "components/Common/Icon/Icon";
import { Query, SORT_TYPES, SORT_ORDERS } from "utils/constants";
import { getObjectTruthyValue } from "utils/utils";
import style from "./Sort.module.scss";

type SortProps = {
  onModalClose: () => void;
};

type State = {
  [Query.Sort]: string | null;
  [Query.Order]: string | null;
};

const getDefaultState = (searchParams: URLSearchParams): State => ({
  [Query.Sort]: searchParams.get(Query.Sort),
  [Query.Order]: searchParams.get(Query.Order),
});

export const Sort = (props: SortProps) => {
  const { onModalClose } = props;
  const { isMobileVp } = useSelector(getCurrentViewport);
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useState<State>(getDefaultState(searchParams));
  const activeSortType = state[Query.Sort];
  const activeSortOrder = state[Query.Order];

  useEffect(() => {
    if (!isMobileVp) {
      // На мобильных устройствах searchParams устанавливаются по кнопке "Применить"
      const activeSortParams = getObjectTruthyValue(state);
      setSearchParams(activeSortParams);
    }
  }, [isMobileVp, setSearchParams, state]);

  const onSortTypeButtonClick = ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    setState((prevState) => ({ ...prevState, [Query.Sort]: currentTarget.id }));
  };

  const onSortOrderButtonClick = ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    setState((prevState) => ({ ...prevState, [Query.Order]: currentTarget.id }));
  };

  const onSubmitButtonClick = () => {
    const activeSortParams = getObjectTruthyValue(state);
    setSearchParams(activeSortParams);
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
