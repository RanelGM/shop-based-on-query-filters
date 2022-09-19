import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useDispatch } from "react-redux";
import cn from "classnames";
import { setCartItem } from "store/cart/actions";
import { CartItem } from "types/cart";
import { Button } from "components/Common/Button/Button";
import { MAX_CART_COUNT, MIN_CART_COUNT } from "utils/constants";
import style from "../CartItem.module.scss";

type PriceRangeProps = {
  cartItem: CartItem;
  onCartItemRemove: () => void;
};

export const PriceRange = (props: PriceRangeProps) => {
  const { cartItem, onCartItemRemove } = props;
  const { amount } = cartItem;
  // amount - пропсами (от cartItem из redux store) с типом number для корректного подсчета
  // currentAmount - локальный (для и смены итоговой цены на blur у инпут) с типом string (для корректного ввода без редактрования 0 как первого символа)
  const [currentAmount, setCurrentAmount] = useState<string>(`${amount}`);
  const numericCurrentAmount = Number(currentAmount);
  const dispatch = useDispatch();

  const onAmountInputChange = ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    // Диапазон значений для заказа от 0 по 99
    const absValue = Number(value) < 0 ? `${Math.abs(Number(value))}` : value;
    const maxLength = `${MAX_CART_COUNT}`.length;

    if (absValue.length > maxLength) {
      return;
    }

    setCurrentAmount(absValue);
  };

  const onAmountInputBlur = () => {
    if (numericCurrentAmount < MIN_CART_COUNT) {
      setCurrentAmount(`${MIN_CART_COUNT}`);
      dispatch(setCartItem({ ...cartItem, amount: MIN_CART_COUNT }));
      return;
    }

    if (numericCurrentAmount > MAX_CART_COUNT) {
      setCurrentAmount(`${MAX_CART_COUNT}`);
      dispatch(setCartItem({ ...cartItem, amount: MAX_CART_COUNT }));
      return;
    }

    dispatch(setCartItem({ ...cartItem, amount: numericCurrentAmount }));
  };

  const onAmountInputEnterKeydown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key === "Enter") {
      evt.currentTarget.blur();
    }
  };

  const onIncrementButtonClick = () => {
    if (numericCurrentAmount < MAX_CART_COUNT) {
      setCurrentAmount(`${numericCurrentAmount + 1}`);
      dispatch(setCartItem({ ...cartItem, amount: numericCurrentAmount + 1 }));
    }
  };

  const onDecrementButtonClick = () => {
    if (numericCurrentAmount > MIN_CART_COUNT) {
      setCurrentAmount(`${numericCurrentAmount - 1}`);
      dispatch(setCartItem({ ...cartItem, amount: numericCurrentAmount - 1 }));
    } else {
      onCartItemRemove();
    }
  };

  return (
    <div className={style.priceInputWrapper}>
      <Button
        className={cn(style.priceButton, style["priceButton--dec"])}
        color="white-red"
        onClick={onDecrementButtonClick}
      >
        –
      </Button>
      <input
        className={style.priceInput}
        value={currentAmount}
        onChange={onAmountInputChange}
        onBlur={onAmountInputBlur}
        onKeyDown={onAmountInputEnterKeydown}
        type="number"
      />
      <Button
        className={cn(style.priceButton, style["priceButton--inc"])}
        color="white-red"
        onClick={onIncrementButtonClick}
      >
        +
      </Button>
    </div>
  );
};
