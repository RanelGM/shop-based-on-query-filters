import { ButtonHTMLAttributes, MutableRefObject } from "react";
import cn from "classnames";
import style from "./Button.module.scss";

export type ButtonColor = "red" | "white-red" | "white-black";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: ButtonColor;
  className?: string;
  icon?: JSX.Element;
  forwardRef?: MutableRefObject<HTMLButtonElement>;
};

export const Button = (props: ButtonProps) => {
  const { color, className, icon, forwardRef, children, type, ...rest } = props;

  return (
    <button
      className={cn(style.button, className, color && style[`button--${color}`])}
      type={type || "button"}
      ref={forwardRef}
      {...rest}
    >
      {icon && <span className={style.iconWrapper}>{icon}</span>}
      {children}
    </button>
  );
};
