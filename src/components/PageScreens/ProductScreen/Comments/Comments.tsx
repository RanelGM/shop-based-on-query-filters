import { UserComment } from "types/guitar";
import { Button } from "components/Common/Button/Button";
import { RatingStars } from "components/Common/RatingStars/RatingStars";
import { formatDate } from "utils/utils";
import style from "./Comments.module.scss";

type CommentsProps = {
  comments: UserComment[];
};

export const Comments = ({ comments }: CommentsProps) => {
  return (
    <div className={style.component}>
      <div className={style.headingWrapper}>
        <h2>Отзывы</h2>
        <Button color="white-red">Оставить отзыв</Button>
      </div>

      <ul className={style.commentList}>
        {comments.map((item) => {
          const { id, userName, createAt, rating, advantage, disadvantage, comment } = item;

          return (
            <li key={id} className={style.commentItem}>
              <div className={style.itemHeadingWrapper}>
                <h3>{userName}</h3>
                <p className={style.date}>{formatDate(createAt)}</p>
              </div>
              <RatingStars rating={rating} />
              <div className={style.infoWrapper}>
                <div className={style.info}>
                  <h3>Достоинства:</h3>
                  <p>{advantage}</p>
                </div>
                <div className={style.info}>
                  <h3>Недостатки:</h3>
                  <p>{disadvantage}</p>
                </div>
                <div className={style.info}>
                  <h3>Комментарий:</h3>
                  <p>{comment}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
