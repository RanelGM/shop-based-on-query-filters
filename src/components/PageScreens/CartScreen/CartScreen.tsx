import { FormEvent } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import cn from "classnames";
import { getCart, getDiscount } from "store/cart/selectors";
import { Button } from "components/Common/Button/Button";
import { Positioner } from "components/Common/Positioner/Positioner";
import { CartItem } from "./CartItem/CartItem";
import { Discount } from "./Discount/Discount";
import { AppRoute } from "utils/constants";
import { formatPrice } from "utils/utils";
import style from "./CartScreen.module.scss";

export const CartScreen = () => {
  const cart = useSelector(getCart);
  const { discount, coupon } = useSelector(getDiscount);
  const totalPrice = cart.reduce((accum, cartItem) => (accum += cartItem.amount * cartItem.price), 0);
  const discountPrice = (totalPrice * discount) / 100;

  const onFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const currentCart = cart.map(({ id, amount }) => ({ id, amount }));
    const order = { coupon: coupon, currentCart };
    alert(`Отправляемый заказ: ${JSON.stringify(order, undefined, 2)}`);
  };

  return (
    <Positioner>
      <h1 className={style.heading}>Корзина</h1>

      {cart.length > 0 ? (
        <form onSubmit={onFormSubmit}>
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
              <p className={style.price}>
                <b>Всего:</b> <span>{formatPrice(totalPrice)} ₽</span>
              </p>
              <p className={cn(style.price, discount > 0 && style["price--discount"])}>
                <b>Скидка:</b> <span>{formatPrice(discountPrice)} ₽</span>
              </p>
              <p className={style.price}>
                <b>К оплате:</b> <b>{formatPrice(totalPrice - discountPrice)} ₽</b>
              </p>
              <Button color="red" type="submit" className={style.submitButton}>
                Оформить заказ
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <div>
          <p>Корзина пуста</p>
          <p>
            Воспользуйтесь <Link to={`${AppRoute.Catalog}/1`}>каталогом</Link>, чтобы найти нужный товар
          </p>
        </div>
      )}
    </Positioner>
  );
};
