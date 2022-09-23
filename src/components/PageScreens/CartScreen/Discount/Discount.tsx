import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDiscount } from "store/cart/actions";
import { loadDiscount } from "store/cart/asyncActions";
import { getDiscount } from "store/cart/selectors";
import { useAsyncDispatch } from "hooks/useAsyncDispatch";
import { Button } from "components/Common/Button/Button";
import { Input } from "components/Common/Input/Input";
import { Loader } from "components/Common/Loader/Loader";
import style from "./Discount.module.scss";

export const Discount = () => {
  const { coupon } = useSelector(getDiscount);
  const [inputValue, setInputValue] = useState(coupon);
  const dispatch = useDispatch();

  const resetDiscount = () => {
    dispatch(setDiscount({ coupon: "", discount: 0 }));
  };

  const [status, load] = useAsyncDispatch({
    onLoad: (inputValue: string) => loadDiscount(inputValue),
    onError: () => resetDiscount(),
  });

  const onInputChange = ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    setInputValue(currentTarget.value.trim().toLowerCase());
  };

  const onSubmitButtonClick = () => {
    if (inputValue) {
      load(inputValue);
    } else {
      resetDiscount();
    }
  };

  const onEnterKeydown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === "Enter") {
      load(inputValue);
    }
  };

  return (
    <>
      {status.isLoading && <Loader />}

      <div className={style.component}>
        <h2 className={style.heading}>Промокод на скидку</h2>
        <p className={style.text}>Введите свой промокод, если он у вас есть</p>
        <div className={style.controlsWrapper}>
          <Input
            id="discount"
            className={style.inputWrapper}
            placeholder="Введите промокод"
            value={inputValue}
            onKeyDown={onEnterKeydown}
            onChange={onInputChange}
          />
          <Button className={style.button} onClick={onSubmitButtonClick}>
            Применить
          </Button>
        </div>
      </div>
    </>
  );
};
