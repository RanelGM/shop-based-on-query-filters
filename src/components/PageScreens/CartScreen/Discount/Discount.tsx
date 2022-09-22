import { Button } from "components/Common/Button/Button";
import { Input } from "components/Common/Input/Input";
import style from "./Discount.module.scss";

export const Discount = () => {
  return (
    <div className={style.component}>
      <h2 className={style.heading}>Промокод на скидку</h2>
      <p className={style.text}>Введите свой промокод, если он у вас есть</p>
      <div className={style.controlsWrapper}>
        <Input id="discount" className={style.inputWrapper} placeholder="Введите промокод" />
        <Button className={style.button}>Применить</Button>
      </div>
    </div>
  );
};
