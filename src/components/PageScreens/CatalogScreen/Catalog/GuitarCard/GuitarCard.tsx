import { useRef } from "react";
import { useSelector } from "react-redux";
import { getCart } from "store/cart/selectors";
import useModal from "hooks/useModal";
import { Guitar } from "types/guitar";
import { Button } from "components/Common/Button/Button";
import { ButtonLink } from "components/Common/ButtonLink/ButtonLink";
import { Icon } from "components/Common/Icon/Icon";
import { RatingStars } from "components/Common/RatingStars/RatingStars";
import { CartModal } from "components/Modals/CartModal/CartModal";
import { CartModalSuccess } from "components/Modals/CartModalSuccess/CartModalSuccess";
import { AppRoute } from "utils/constants";
import { formatPrice } from "utils/utils";
import style from "./GuitarCard.module.scss";

type GuitarCardProps = {
  guitar: Guitar;
};

export const GuitarCard = ({ guitar }: GuitarCardProps) => {
  const { id, previewImg, rating, comments, name, price } = guitar;
  const cart = useSelector(getCart);
  const isGuitarInCart = cart.some((cartItem) => cartItem.id === id);

  const modalAddRef = useRef<HTMLDivElement | null>(null);
  const modalSuccessRef = useRef<HTMLDivElement | null>(null);
  const [isModalAddOpen, setIsModalAddOpen] = useModal({ componentRef: modalAddRef, isClickCapture: true });
  const [isModalSuccessOpen, setIsModalSuccessOpen] = useModal({ componentRef: modalSuccessRef, isClickCapture: true });

  const onAddButtonClick = () => setIsModalAddOpen.openModal();
  const onModalSuccessOpen = () => setIsModalSuccessOpen.openModal();

  return (
    <>
      {isModalSuccessOpen && (
        <CartModalSuccess componentRef={modalSuccessRef} onModalClose={setIsModalSuccessOpen.closeModal} />
      )}
      {isModalAddOpen && (
        <CartModal
          componentRef={modalAddRef}
          guitar={guitar}
          modalType="add"
          onModalClose={setIsModalAddOpen.closeModal}
          onExtraModalOpen={onModalSuccessOpen}
        />
      )}

      <div className={style.component}>
        <img className={style.image} width="68" height="190" alt="Гитара" src={`/${previewImg}`} />

        <div className={style.infoWrapper}>
          <RatingStars rating={rating} commentCount={comments.length} />
          <div className={style.info}>
            <p className={style.infoTitle}>{name}</p>
            <p className={style.infoPrice}>{formatPrice(price)} ₽</p>
          </div>

          <div className={style.buttonsWrapper}>
            <ButtonLink className={style.button} to={"#"}>
              Подробнее
            </ButtonLink>
            {isGuitarInCart ? (
              <ButtonLink to={AppRoute.Cart} className={style.button} color="white-red" icon={<Icon iconName="cart" />}>
                В Корзине
              </ButtonLink>
            ) : (
              <Button
                className={style.button}
                color="red"
                icon={<Icon iconName="cartAlt" />}
                onClick={onAddButtonClick}
              >
                Купить
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
