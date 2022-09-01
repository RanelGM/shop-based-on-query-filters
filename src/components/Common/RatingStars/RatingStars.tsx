import { Icon } from "../Icon/Icon";
import style from "./RatingStars.module.scss";

type RatingStarsProps = {
  rating: number;
  width?: number;
  height?: number;
  starCount?: number;
  commentCount?: number;
};

export const RatingStars = (props: RatingStarsProps) => {
  const { rating, width = 12, height = 12, starCount: count = 5, commentCount } = props;

  return (
    <div className={style.component}>
      {Array.from({ length: count }, (_star, index) => (
        <Icon
          className={style.icon}
          key={index}
          iconName={rating >= index + 1 ? "star" : "starEmpty"}
          style={{ width: width, height: height }}
        />
      ))}

      {commentCount && <span className={style.comment}>{commentCount}</span>}
    </div>
  );
};
