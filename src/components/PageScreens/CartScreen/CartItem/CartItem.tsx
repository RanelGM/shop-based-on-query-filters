import cn from "classnames";
import { CartItem as CartItemType } from "types/cart";
import { Button } from "components/Common/Button/Button";
import { ButtonClose } from "components/Common/Button/ButtonClose";
import { GUITAR } from "utils/constants";
import { formatPrice } from "utils/utils";
import style from "./CartItem.module.scss";

type CartItemProps = {
  cartItem: CartItemType;
};

export const CartItem = ({ cartItem }: CartItemProps) => {
  const { previewImg, name, vendorCode, type, stringCount, price, amount } = cartItem;

  const guitarType = GUITAR[type].label;
  const totalPrice = price * amount;

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
            <Button className={cn(style.priceButton, style["priceButton--dec"])} color="white-red">
              –
            </Button>
            <input className={style.priceInput} />
            <Button className={cn(style.priceButton, style["priceButton--inc"])} color="white-red">
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
