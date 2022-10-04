import { MouseEvent, useMemo, useRef, useState } from "react";
import useModal from "hooks/useModal";
import { UserComment } from "types/guitar";
import { Button } from "components/Common/Button/Button";
import { RatingStars } from "components/Common/RatingStars/RatingStars";
import { CommentModal } from "components/Modals/CommentModal/CommentModal";
import { COMMENTS_COUNT_STEP } from "utils/constants";
import { formatDate } from "utils/utils";
import style from "./Comments.module.scss";

type CommentsProps = {
  comments: UserComment[];
};

export const Comments = ({ comments }: CommentsProps) => {
  const [commentsCount, setCommentsCount] = useState<number>(COMMENTS_COUNT_STEP);

  const commentsToShow = useMemo(() => comments.slice(0, commentsCount), [comments, commentsCount]);
  const isButtonMoreShow = commentsToShow.length > 0 && commentsCount < comments.length;

  const modalCommentRef = useRef<HTMLDivElement | null>(null);
  const [isModalCommentOpen, modalCommentComments] = useModal({ componentRef: modalCommentRef, isClickCapture: true });

  const onCommentAddBtnClick = modalCommentComments.openModal;

  const onButtonShowClick = ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    const newCommentsCount =
      commentsCount + COMMENTS_COUNT_STEP <= comments.length ? commentsCount + COMMENTS_COUNT_STEP : comments.length;

    setCommentsCount(newCommentsCount);
    currentTarget.blur();
  };

  return (
    <>
      {isModalCommentOpen && (
        <CommentModal componentRef={modalCommentRef} onModalClose={modalCommentComments.closeModal} />
      )}

      <div className={style.component}>
        <div className={style.headingWrapper}>
          <h2>Отзывы</h2>
          <Button color="white-red" onClick={onCommentAddBtnClick}>
            Оставить отзыв
          </Button>
        </div>

        <ul className={style.commentList}>
          {commentsToShow.length === 0 ? (
            <li className={style.commentItem}>Отзывов ещё нет, но вы можете стать первым!</li>
          ) : (
            commentsToShow.map((item) => {
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
            })
          )}
        </ul>

        {isButtonMoreShow && (
          <Button className={style.buttonShow} onClick={onButtonShowClick}>
            Показать ещё отзывы
          </Button>
        )}
      </div>
    </>
  );
};
