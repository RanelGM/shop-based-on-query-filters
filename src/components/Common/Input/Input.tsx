import { InputHTMLAttributes, MutableRefObject } from "react";
import cn from "classnames";
import style from "./Input.module.scss";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  className?: string;
  label?: string;
  message?: string;
  forwardRef?: MutableRefObject<HTMLInputElement | null>;
};

export const Input = (props: InputProps) => {
  const { id, className, message, label, forwardRef, ...rest } = props;

  return (
    <div className={cn(style.component, className)}>
      {label && (
        <label htmlFor={id} className={style.label}>
          {label}
        </label>
      )}

      <input id={id} className={style.input} {...rest} ref={forwardRef} />

      {message && <p className={style.message}>{message}</p>}
    </div>
  );
};
