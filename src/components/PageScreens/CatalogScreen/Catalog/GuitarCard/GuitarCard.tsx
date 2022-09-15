import { useRef } from "react";
import useModal from "hooks/useModal";
import { Guitar } from "types/guitar";
import { Button } from "components/Common/Button/Button";
import { ButtonLink } from "components/Common/ButtonLink/ButtonLink";
import { Icon } from "components/Common/Icon/Icon";
import { RatingStars } from "components/Common/RatingStars/RatingStars";
import { CartModal } from "components/Modals/CartModal/CartModal";
import { formatPrice } from "utils/utils";
import style from "./GuitarCard.module.scss";

type GuitarCardProps = {
  guitar: Guitar;
};

export const GuitarCard = ({ guitar }: GuitarCardProps) => {
  const { previewImg, rating, comments, name, price } = guitar;

  const modalAddRef = useRef<HTMLDivElement | null>(null);
  const [isModalAddOpen, setIsModalAddOpen] = useModal({ componentRef: modalAddRef, isClickCapture: true });

  const onAddButtonClick = () => setIsModalAddOpen.openModal();

  return (
    <>
      {isModalAddOpen && (
        <CartModal
          componentRef={modalAddRef}
          guitar={guitar}
          modalType="add"
          onModalClose={setIsModalAddOpen.closeModal}
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
            <Button className={style.button} color="red" icon={<Icon iconName="cartAlt" />} onClick={onAddButtonClick}>
              Купить
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
