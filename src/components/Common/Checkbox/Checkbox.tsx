import { InputHTMLAttributes } from "react";
import cn from "classnames";
import style from "./Checkbox.module.scss";

type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  className?: string;
  label?: string;
};

export const Checkbox = (props: CheckboxProps) => {
  const { id, className, label, type, ...rest } = props;

  return (
    <div className={cn(style.component, className)}>
      <input className={style.input} id={id} type={type || "checkbox"} {...rest} />

      <label className={style.label} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
