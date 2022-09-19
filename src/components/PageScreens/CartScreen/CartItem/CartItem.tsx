import { ChangeEvent, KeyboardEvent, useState } from "react";
import { useDispatch } from "react-redux";
import cn from "classnames";
import { setCartItem } from "store/cart/actions";
import { CartItem as CartItemType } from "types/cart";
import { Button } from "components/Common/Button/Button";
import { ButtonClose } from "components/Common/Button/ButtonClose";
import { GUITAR, MAX_CART_COUNT, MIN_CART_COUNT } from "utils/constants";
import { formatPrice } from "utils/utils";
import style from "./CartItem.module.scss";

type CartItemProps = {
  cartItem: CartItemType;
};

export const CartItem = ({ cartItem }: CartItemProps) => {
  const { previewImg, name, vendorCode, type, stringCount, price, amount } = cartItem;

  // amount - из redux store с типом number для корректного подсчета
  // currentAmount - локальный (для и смены итоговой цены на blur у инпут) с типом string (для корректного ввода без редактрования 0 как первого символа)
  const [currentAmount, setCurrentAmount] = useState<string>(`${amount}`);
  const numericCurrentAmount = Number(currentAmount);
  const dispatch = useDispatch();

  const guitarType = GUITAR[type].label;
  const totalPrice = price * amount;

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
    }
  };

  return (
    <div className={style.component}>
      <ButtonClose className={style.buttonRemove} />
      <img className={style.image} width="55" height="130" alt="Гитара" src={`/${previewImg}`} />
      <div className={style.infoWrapper}>
        <div className={style.info}>
          <h2 className={style.heading}>
            {guitarType} {name}
          </h2>
          <p className={style.text}>Артикул: {vendorCode}</p>
          <p className={style.text}>
            {guitarType}, {stringCount} струнная
          </p>
        </div>
        <div className={style.priceWrapper}>
          <p className={style.priceText}>
            <span className={style.priceTextLabel}>Цена:</span>
            <span>{formatPrice(price)} ₽</span>
          </p>
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
          <p className={style.priceText}>
            <span className={style.priceTextLabel}>Сумма:</span>
            <span>{formatPrice(totalPrice)} ₽</span>
          </p>
        </div>
      </div>
    </div>
  );
};
