import { MutableRefObject, RefCallback, TextareaHTMLAttributes } from "react";
import cn from "classnames";
import style from "./Input.module.scss";

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  id: string;
  className?: string;
  label?: string;
  labelRequired?: boolean;
  message?: string;
  forwardRef?: MutableRefObject<HTMLTextAreaElement | null> | RefCallback<HTMLTextAreaElement>;
};

export const TextArea = (props: TextAreaProps) => {
  const { id, className, message, label, labelRequired, forwardRef, rows = 3, ...rest } = props;

  return (
    <div className={cn(style.component, className)}>
      {label && (
        <label htmlFor={id} className={style.label}>
          <span>{label}</span>
          {labelRequired && <span className={style.required}>*</span>}
        </label>
      )}

      <textarea id={id} className={style.textarea} rows={rows} {...rest} ref={forwardRef} />

      {message && <p className={style.message}>{message}</p>}
    </div>
  );
};
