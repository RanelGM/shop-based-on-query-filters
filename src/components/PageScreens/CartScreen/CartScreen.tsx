import { useSelector } from "react-redux";
import { getCart } from "store/cart/selectors";
import { Positioner } from "components/Common/Positioner/Positioner";
import { CartItem } from "./CartItem/CartItem";
import style from "./CartScreen.module.scss";

export const CartScreen = () => {
  const cart = useSelector(getCart);

  return (
    <Positioner>
      <h1 className={style.heading}>Корзина</h1>

      {cart.length > 0 ? (
        <ul className={style.cartList}>
          {cart.map((cartItem) => (
            <li key={cartItem.id} className={style.cartItem}>
              <CartItem cartItem={cartItem} />
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </Positioner>
  );
};
