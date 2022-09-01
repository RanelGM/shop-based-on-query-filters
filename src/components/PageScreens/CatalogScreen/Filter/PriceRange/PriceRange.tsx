import { Input } from "components/Common/Input/Input";
import filterStyle from "../Filter.module.scss";
import style from "./PriceRange.module.scss";

export const PriceRange = () => {
  return (
    <div className={filterStyle.filterWrapper}>
      <p className={filterStyle.legend}>Цена, ₽</p>
      <div className={style.inputsWrapper}>
        <Input id="priceFrom" className={style.inputWrapper} />
        <Input id="priceTo" className={style.inputWrapper} />
      </div>
    </div>
  );
};
