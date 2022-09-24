import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import useModal from "hooks/useModal";
import { Guitar } from "types/guitar";
import { Button } from "components/Common/Button/Button";
import { RatingStars } from "components/Common/RatingStars/RatingStars";
import { CartModal } from "components/Modals/CartModal/CartModal";
import { CartModalSuccess } from "components/Modals/CartModalSuccess/CartModalSuccess";
import { AppRoute, GUITAR } from "utils/constants";
import { formatPrice } from "utils/utils";
import style from "./Product.module.scss";

type ProductProps = {
  guitar: Guitar;
};

export const Product = ({ guitar }: ProductProps) => {
  const { previewImg, rating, comments, name, vendorCode, type, stringCount, description, price } = guitar;
  const guitarType = GUITAR[type].label;

  const navigateTo = useNavigate();
  const modalAddRef = useRef<HTMLDivElement | null>(null);
  const modalSuccessRef = useRef<HTMLDivElement | null>(null);
  const [isModalAddOpen, modalAddCallbacks] = useModal({ componentRef: modalAddRef, isClickCapture: true });
  const [isModalSuccessOpen, setIsModalSuccessOpen] = useModal({ componentRef: modalSuccessRef, isClickCapture: true });

  const onAddButtonClick = () => modalAddCallbacks.openModal();
  const onModalSuccessOpen = () => setIsModalSuccessOpen.openModal();
  const onModalSuccessClose = () => {
    setIsModalSuccessOpen.closeModal();
    navigateTo(`${AppRoute.Catalog}/1`);
  };

  return (
    <>
      {isModalSuccessOpen && <CartModalSuccess componentRef={modalSuccessRef} onModalClose={onModalSuccessClose} />}

      {isModalAddOpen && (
        <CartModal
          componentRef={modalAddRef}
          modalType="add"
          guitar={guitar}
          onModalClose={modalAddCallbacks.closeModal}
          onExtraModalOpen={onModalSuccessOpen}
        />
      )}

      <div className={style.component}>
        <img className={style.img} width="90" height="235" alt="Гитара" src={`/${previewImg}`} />

        <div className={style.infoWrapper}>
          <h2 className={style.heading}>{name}</h2>
          <RatingStars rating={rating} commentCount={comments.length} />

          <div className={style.info}>
            <p className={style.infoText}>
              <span>Артикул:</span>
              <span>{vendorCode}</span>
            </p>
            <p className={style.infoText}>
              <span>Тип:</span>
              <span>{guitarType}</span>
            </p>
            <p className={style.infoText}>
              <span>Количество струн:</span>
              <span>{stringCount} струнная</span>
            </p>
            <p className={cn(style.infoText, style["infoText--description"])}>
              <span>Описание:</span>
              <span>{description}</span>
            </p>
          </div>
        </div>

        <div className={style.priceWrapper}>
          <p className={style.price}>
            <span>Цена:</span>
            <b>{formatPrice(price)} ₽</b>
          </p>
          <Button className={style.buttonAdd} color="red" onClick={onAddButtonClick}>
            Добавить в корзину
          </Button>
        </div>
      </div>
    </>
  );
};
