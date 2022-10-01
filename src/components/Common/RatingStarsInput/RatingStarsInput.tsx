import { InputHTMLAttributes, MutableRefObject, RefCallback, useState } from "react";
import cn from "classnames";
import { Icon } from "../Icon/Icon";
import style from "./RatingStarsInput.module.scss";

type InputStarsProps = InputHTMLAttributes<HTMLInputElement> & {
  width?: number;
  height?: number;
  starCount?: number;
  className?: string;
  label?: string;
  labelRequired?: boolean;
  message?: string;
  forwardRef?: MutableRefObject<HTMLInputElement | null> | RefCallback<HTMLInputElement>;
  onRatingChange?: (rating: number) => void;
};

export const InputStars = (props: InputStarsProps) => {
  const { width = 20, height = 20, starCount = 5 } = props;
  const { className, label, labelRequired, message, forwardRef, onRatingChange, ...rest } = props;

  const [rating, setRating] = useState(0);

  const onIconClick = (starIndex: number) => {
    setRating(starIndex + 1);

    if (onRatingChange) {
      onRatingChange(starIndex + 1);
    }
  };

  return (
    <div className={cn(style.component, className)}>
      {label && (
        <p className={style.label}>
          <span>{label}</span>
          {labelRequired && <span className={style.required}>*</span>}
        </p>
      )}

      <div className={style.stars}>
        {Array.from({ length: starCount }, (_star, index) => (
          <Icon
            className={style.icon}
            key={index}
            iconName={rating >= index + 1 ? "star" : "starEmpty"}
            style={{ width: width, height: height }}
            onClick={() => onIconClick(index)}
          />
        ))}
      </div>

      <input className={style.input} {...rest} ref={forwardRef} />

      {message && <p className={style.message}>{message}</p>}
    </div>
  );
};
