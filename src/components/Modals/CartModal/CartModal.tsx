import { MutableRefObject } from "react";
import { useDispatch } from "react-redux";
import { setGuitarInCart } from "store/cart/actions";
import { Guitar } from "types/guitar";
import { Button } from "components/Common/Button/Button";
import { ButtonClose } from "components/Common/Button/ButtonClose";
import { Overlay } from "components/Common/Overlay/Overlay";
import { GUITAR } from "utils/constants";
import { formatPrice } from "utils/utils";
import style from "./CartModal.module.scss";

type ModalType = "add" | "delete";

type CartModalProps = {
  componentRef: MutableRefObject<HTMLDivElement | null>;
  guitar: Guitar;
  modalType: ModalType;
  onModalClose: () => void;
  onExtraModalOpen?: () => void;
};

export const CartModal = (props: CartModalProps) => {
  const { componentRef, guitar, modalType, onModalClose, onExtraModalOpen } = props;
  const { previewImg, name, vendorCode, type, stringCount, price } = guitar;
  const dispatch = useDispatch();

  const isModalAdd = modalType === "add";
  const heading = isModalAdd ? "Добавить товар в корзину" : "Удалить этот товар?";
  const guitarType = GUITAR[type].label;

  const onAddButtonClick = () => {
    dispatch(setGuitarInCart(guitar));

    if (onExtraModalOpen) {
      onExtraModalOpen();
    }

    onModalClose();
  };

  return (
    <Overlay>
      <div className={style.component} ref={componentRef}>
        <ButtonClose onClick={onModalClose} />

        <h2 className={style.heading}>{heading}</h2>

        <div className={style.infoWrapper}>
          <img className={style.image} width="67" height="137" alt="Гитара" src={`/${previewImg}`} />
          <div className={style.info}>
            <p className={style.nameText}>Гитара {name}</p>
            <p className={style.text}>Артикул: {vendorCode}</p>
            <p className={style.text}>
              {guitarType}, {stringCount} струнная
            </p>
            <p className={style.priceText}>Цена: {formatPrice(price)} ₽</p>
          </div>
        </div>

        {isModalAdd ? (
          <Button className={style.buttonAdd} color="red" onClick={onAddButtonClick}>
            Добавить в корзину
          </Button>
        ) : (
          <div className={style.buttonsWrapper}>
            <Button color="white-red">Удалить товар</Button>
            <Button color="white-black" onClick={onModalClose}>
              Продолжить покупки
            </Button>
          </div>
        )}
      </div>
    </Overlay>
  );
};
