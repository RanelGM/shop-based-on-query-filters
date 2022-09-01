import { Button } from "components/Common/Button/Button";
import { ButtonLink } from "components/Common/ButtonLink/ButtonLink";
import { Icon } from "components/Common/Icon/Icon";
import { RatingStars } from "components/Common/RatingStars/RatingStars";
import style from "./GuitarCard.module.scss";

export const GuitarCard = () => {
  const mockRating = 4;

  return (
    <div className={style.component}>
      <img
        className={style.image}
        width="68"
        height="190"
        alt="Гитара"
        src={require("../../../../../assets/img/content/guitar1.jpg")}
      />
      <RatingStars rating={mockRating} commentCount={5} />
      <div className={style.info}>
        <p className={style.infoTitle}>Честер Bass</p>
        <p className={style.infoPrice}>17 500 ₽</p>
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
  );
};
