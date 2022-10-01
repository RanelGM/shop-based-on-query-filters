import { MutableRefObject } from "react";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import cn from "classnames";
import { getGuitar } from "store/guitar/selectors";
import { Button } from "components/Common/Button/Button";
import { ButtonClose } from "components/Common/Button/ButtonClose";
import { Input } from "components/Common/Input/Input";
import { TextArea } from "components/Common/Input/TextArea";
import { Overlay } from "components/Common/Overlay/Overlay";
import { InputStars } from "components/Common/RatingStarsInput/RatingStarsInput";
import { CommentForm } from "utils/constants";
import style from "./CommentModal.module.scss";

type CommentModalProps = {
  componentRef: MutableRefObject<HTMLDivElement | null>;
  onModalClose: () => void;
};

type FormValues = {
  [CommentForm.Name]: string;
  [CommentForm.Rating]: string;
  [CommentForm.Advantage]: string;
  [CommentForm.Disadvantage]: string;
  [CommentForm.Comment]: string;
};

const defaultValues = {
  [CommentForm.Name]: "",
  [CommentForm.Rating]: "",
  [CommentForm.Advantage]: "",
  [CommentForm.Disadvantage]: "",
  [CommentForm.Comment]: "",
};

const emptyMessage = "Заполните поле";

export const CommentModal = (props: CommentModalProps) => {
  const { componentRef, onModalClose } = props;
  const guitar = useSelector(getGuitar);

  const { control, handleSubmit, formState, setValue, clearErrors } = useForm<FormValues>({
    defaultValues: defaultValues,
  });

  const onFormSubmit = (data: FormValues) => {
    console.log(data);
  };

  const onRatingChange = (rating: number) => {
    setValue(CommentForm.Rating, `${rating}`);
    clearErrors(CommentForm.Rating);
  };

  return (
    <Overlay>
      <div className={style.component} ref={componentRef}>
        <ButtonClose onClick={onModalClose} className={style.buttonClose} />

        <h2 className={style.heading}>Оставить отзыв</h2>
        <h3 className={cn(style.heading, style["heading--upper"])}>{guitar?.name || ""}</h3>

        <form className={style.form} onSubmit={handleSubmit(onFormSubmit)}>
          <fieldset className={style.textField}>
            <div className={style.ratingWrapper}>
              <Controller
                name={CommentForm.Name}
                control={control}
                render={({ field: { ref, ...restField } }) => (
                  <Input
                    id={CommentForm.Name}
                    label={"Ваше имя"}
                    labelRequired={true}
                    message={formState.errors[CommentForm.Name]?.message}
                    forwardRef={ref}
                    {...restField}
                  />
                )}
                rules={{ required: emptyMessage }}
              />

              <Controller
                name={CommentForm.Rating}
                control={control}
                render={({ field: { ref, ...restField } }) => (
                  <InputStars
                    id={CommentForm.Rating}
                    label={"Ваше имя"}
                    labelRequired={true}
                    message={formState.errors[CommentForm.Rating]?.message}
                    forwardRef={ref}
                    onRatingChange={onRatingChange}
                    {...restField}
                  />
                )}
                rules={{ required: emptyMessage }}
              />
            </div>
            <Controller
              name={CommentForm.Advantage}
              control={control}
              render={({ field: { ref, ...restField } }) => (
                <Input
                  id={CommentForm.Advantage}
                  label={"Достоинства"}
                  labelRequired={true}
                  message={formState.errors[CommentForm.Advantage]?.message}
                  forwardRef={ref}
                  {...restField}
                />
              )}
              rules={{ required: emptyMessage }}
            />
            <Controller
              name={CommentForm.Disadvantage}
              control={control}
              render={({ field: { ref, ...restField } }) => (
                <Input
                  id={CommentForm.Disadvantage}
                  label={"Недостатки"}
                  labelRequired={true}
                  message={formState.errors[CommentForm.Disadvantage]?.message}
                  forwardRef={ref}
                  {...restField}
                />
              )}
              rules={{ required: emptyMessage }}
            />
            <Controller
              name={CommentForm.Comment}
              control={control}
              render={({ field: { ref, ...restField } }) => (
                <TextArea
                  id={CommentForm.Comment}
                  label={"Комментарий"}
                  labelRequired={true}
                  message={formState.errors[CommentForm.Comment]?.message}
                  forwardRef={ref}
                  {...restField}
                />
              )}
              rules={{ required: emptyMessage }}
            />
          </fieldset>
          <Button type="submit">Отправить отзыв</Button>
        </form>
      </div>
    </Overlay>
  );
};
