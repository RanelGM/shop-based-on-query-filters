import { useSelector } from "react-redux";
import { getCart } from "store/cart/selectors";
import { Button } from "components/Common/Button/Button";
import { Positioner } from "components/Common/Positioner/Positioner";
import { CartItem } from "./CartItem/CartItem";
import { Discount } from "./Discount/Discount";
import { formatPrice } from "utils/utils";
import style from "./CartScreen.module.scss";

export const CartScreen = () => {
  const cart = useSelector(getCart);
  const totalAmount = cart.reduce((accum, cartItem) => (accum += cartItem.amount * cartItem.price), 0);

  return (
    <Positioner>
      <h1 className={style.heading}>Корзина</h1>

      {cart.length > 0 ? (
        <>
          <ul className={style.cartList}>
            {cart.map((cartItem) => (
              <li key={cartItem.id} className={style.cartItem}>
                <CartItem cartItem={cartItem} />
              </li>
            ))}
          </ul>
          <div className={style.totalWrapper}>
            <Discount />
            <div className={style.priceWrapper}>
              <p>
                <span>Всего:</span> <span>{formatPrice(totalAmount)} ₽</span>
              </p>
              <p>
                <span>Скидка:</span> <span>{formatPrice(0)} ₽</span>
              </p>
              <p>
                <span>К оплате:</span> <b>{formatPrice(100)} ₽</b>
              </p>
              <Button color="red" className={style.submitButton}>
                Оформить заказ
              </Button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </Positioner>
  );
};
