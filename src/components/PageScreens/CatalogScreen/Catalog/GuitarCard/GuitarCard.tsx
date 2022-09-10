import { Guitar } from "types/guitar";
import { Button } from "components/Common/Button/Button";
import { ButtonLink } from "components/Common/ButtonLink/ButtonLink";
import { Icon } from "components/Common/Icon/Icon";
import { RatingStars } from "components/Common/RatingStars/RatingStars";
import { formatPrice } from "utils/utils";
import style from "./GuitarCard.module.scss";

type GuitarCardProps = {
  guitar: Guitar;
};

export const GuitarCard = ({ guitar }: GuitarCardProps) => {
  const { previewImg, rating, comments, name, price } = guitar;

  return (
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
          <Button className={style.button} color="red" icon={<Icon iconName="cartAlt" />}>
            Купить
          </Button>
        </div>
      </div>
    </div>
  );
};
