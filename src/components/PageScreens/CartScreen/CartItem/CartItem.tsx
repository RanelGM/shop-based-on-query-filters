import { useRef } from "react";
import useModal from "hooks/useModal";
import { CartItem as CartItemType } from "types/cart";
import { ButtonClose } from "components/Common/Button/ButtonClose";
import { CartModal } from "components/Modals/CartModal/CartModal";
import { PriceRange } from "./PriceRange/PriceRange";
import { GUITAR } from "utils/constants";
import { formatPrice } from "utils/utils";
import style from "./CartItem.module.scss";

type CartItemProps = {
  cartItem: CartItemType;
};

export const CartItem = ({ cartItem }: CartItemProps) => {
  const { amount, ...guitar } = cartItem;
  const { previewImg, name, vendorCode, type, stringCount, price } = guitar;

  const guitarType = GUITAR[type].label;
  const totalPrice = price * amount;

  const modalRemoveRef = useRef<HTMLDivElement | null>(null);
  const [isModalRemoveOpen, modalRemoveCallbacks] = useModal({ componentRef: modalRemoveRef, isClickCapture: true });

  const onCartItemRemove = () => {
    modalRemoveCallbacks.openModal();
  };

  return (
    <>
      {isModalRemoveOpen && (
        <CartModal
          modalType="remove"
          guitar={guitar}
          componentRef={modalRemoveRef}
          onModalClose={modalRemoveCallbacks.closeModal}
        />
      )}

      <div className={style.component}>
        <ButtonClose className={style.buttonRemove} onClick={onCartItemRemove} />
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
            <PriceRange cartItem={cartItem} onCartItemRemove={onCartItemRemove} />
            <p className={style.priceText}>
              <span className={style.priceTextLabel}>Сумма:</span>
              <span>{formatPrice(totalPrice)} ₽</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
