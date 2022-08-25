import { InputHTMLAttributes } from "react";
import cn from "classnames";
import style from "./Input.module.scss";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  className?: string;
  label?: string;
};

export const Input = (props: InputProps) => {
  const { id, className, label, ...rest } = props;

  return (
    <div className={cn(style.component, className)}>
      {label && (
        <label htmlFor={id} className={style.label}>
          {label}
        </label>
      )}

      <input id={id} className={style.input} {...rest} />
    </div>
  );
};
