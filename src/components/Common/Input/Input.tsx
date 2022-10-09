import { InputHTMLAttributes, MutableRefObject, RefCallback } from "react";
import cn from "classnames";
import style from "./Input.module.scss";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  className?: string;
  label?: string;
  labelRequired?: boolean;
  message?: string;
  forwardRef?: MutableRefObject<HTMLInputElement | null> | RefCallback<HTMLInputElement>;
};

export const Input = (props: InputProps) => {
  const { id, className, message, label, labelRequired, forwardRef, autoComplete = "off", ...rest } = props;

  return (
    <div className={cn(style.component, className)}>
      {label && (
        <label htmlFor={id} className={style.label}>
          <span>{label}</span>
          {labelRequired && <span className={style.required}>*</span>}
        </label>
      )}

      <input id={id} className={style.input} autoComplete={autoComplete} {...rest} ref={forwardRef} />

      {message && <p className={style.message}>{message}</p>}
    </div>
  );
};
