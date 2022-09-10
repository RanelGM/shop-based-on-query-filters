import { useSelector } from "react-redux";
import { getPrice } from "store/guitar/selectors";
import { Input } from "components/Common/Input/Input";
import { formatPrice } from "utils/utils";
import filterStyle from "../Filter.module.scss";
import style from "./PriceRange.module.scss";

export const PriceRange = () => {
  const availablePrice = useSelector(getPrice);

  return (
    <div className={filterStyle.filterWrapper}>
      <p className={filterStyle.legend}>Цена, ₽</p>
      <div className={style.inputsWrapper}>
        <Input
          id="priceFrom"
          className={style.inputWrapper}
          type="number"
          placeholder={availablePrice ? formatPrice(availablePrice.min) : ""}
        />
        <Input
          id="priceTo"
          className={style.inputWrapper}
          type="number"
          placeholder={availablePrice ? formatPrice(availablePrice.max) : ""}
        />
      </div>
    </div>
  );
};
