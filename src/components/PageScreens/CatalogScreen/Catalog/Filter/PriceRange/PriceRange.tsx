import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getPrice } from "store/guitar/selectors";
import { Input } from "components/Common/Input/Input";
import { FilterState } from "../Filter";
import { Query } from "utils/constants";
import { formatPrice } from "utils/utils";
import filterStyle from "../Filter.module.scss";
import style from "./PriceRange.module.scss";

type PriceRangeProps = {
  setState: Dispatch<SetStateAction<FilterState>>;
  activePrice: FilterState["price"];
};

export const PriceRange = (props: PriceRangeProps) => {
  const { activePrice, setState } = props;
  const availablePrice = useSelector(getPrice);
  const [searchParams, setSearchParams] = useSearchParams();

  const onInputChange = ({ currentTarget: { value, id } }: ChangeEvent<HTMLInputElement>) => {
    // В id у currentTarget записан ключ по цене from или to
    const absValue = Number(value) < 0 ? `${Math.abs(Number(value))}` : value;

    setState((prevState) => ({
      ...prevState,
      price: {
        ...prevState.price,
        [id]: absValue,
      },
    }));
  };

  const onPriceFromInputBlur = () => {
    if (!activePrice.from) {
      // В случае, если минимальная цена отсутствует, то удаляется из search параметров, происходит выход из функции
      searchParams.delete(Query.PriceFrom);
      setSearchParams(searchParams);
      return;
    }

    // Цена не может быть ниже минимально допустимой
    let price = Math.max(+activePrice.from, availablePrice.min);
    // Цена не может быть выше максимально допустимой (если цена не установлена) и выше максимально установленной (если установлена)
    price = Math.min(price, activePrice.to !== "" ? +activePrice.to : availablePrice.max);

    setState((prevState) => ({
      ...prevState,
      price: {
        ...prevState.price,
        from: `${price}`,
      },
    }));

    searchParams.set(Query.PriceFrom, `${price}`);
    setSearchParams(searchParams);
  };

  const onPriceToInputBlur = () => {
    if (!activePrice.to) {
      // В случае, если максимальная цена отсутствует, то удаляется из search параметров, происходит выход из функции
      searchParams.delete(Query.PriceTo);
      setSearchParams(searchParams);
      return;
    }

    // Цена не может быть выше максимально допустимой
    let price = Math.min(+activePrice.to, availablePrice.max);
    // Цена не может быть ниже минимально допустимой (если цена не установлена) или минимально установленной (если установлена)
    price = Math.max(price, activePrice.from !== "" ? +activePrice.from : availablePrice.min);

    setState((prevState) => ({
      ...prevState,
      price: {
        ...prevState.price,
        to: `${price}`,
      },
    }));

    searchParams.set(Query.PriceTo, `${price}`);
    setSearchParams(searchParams);
  };

  const onEnterKeydown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === "Enter") {
      evt.currentTarget.blur();
    }
  };

  return (
    <div className={filterStyle.filterWrapper}>
      <p className={filterStyle.legend}>Цена, ₽</p>
      <div className={style.inputsWrapper}>
        <Input
          id="from"
          className={style.inputWrapper}
          type="number"
          value={activePrice.from}
          onChange={onInputChange}
          onBlur={onPriceFromInputBlur}
          onKeyDown={onEnterKeydown}
          placeholder={availablePrice ? formatPrice(availablePrice.min) : ""}
        />
        <Input
          id="to"
          className={style.inputWrapper}
          type="number"
          value={activePrice.to}
          onChange={onInputChange}
          onBlur={onPriceToInputBlur}
          onKeyDown={onEnterKeydown}
          placeholder={availablePrice ? formatPrice(availablePrice.max) : ""}
        />
      </div>
    </div>
  );
};
