import { ChangeEvent, KeyboardEvent, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames";
import { setDiscount } from "store/cart/actions";
import { loadDiscount } from "store/cart/asyncActions";
import { setLocalStorageDiscount } from "store/cart/localStorage";
import { getDiscount } from "store/cart/selectors";
import { useAsyncDispatch } from "hooks/useAsyncDispatch";
import { Button } from "components/Common/Button/Button";
import { Input } from "components/Common/Input/Input";
import { Loader } from "components/Common/Loader/Loader";
import style from "./Discount.module.scss";

export const Discount = () => {
  const { coupon, discount } = useSelector(getDiscount);
  const [inputValue, setInputValue] = useState(coupon);
  const dispatch = useDispatch();

  const resetDiscount = () => {
    dispatch(setDiscount({ coupon: "", discount: 0 }));
    setLocalStorageDiscount({ coupon: "", discount: 0 });
  };

  const [status, load, resetStatus] = useAsyncDispatch({
    onLoad: (inputValue: string) => loadDiscount(inputValue),
    onError: () => resetDiscount(),
  });

  const isDiscountActive = discount > 0;

  const discountMessage = useMemo(() => {
    switch (true) {
      case isDiscountActive:
        return "Промокод принят";
      case status.isError:
        return "Неверный промокод";
      default:
        return "";
    }
  }, [isDiscountActive, status.isError]);

  const onInputChange = ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    setInputValue(currentTarget.value.trim().toLowerCase());
  };

  const onSubmitButtonClick = () => {
    if (inputValue) {
      load(inputValue);
    } else {
      resetDiscount();
      resetStatus();
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
            className={cn(style.inputWrapper, isDiscountActive && style["inputWrapper--success"])}
            placeholder="Введите промокод"
            value={inputValue}
            message={discountMessage}
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
