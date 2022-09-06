import { ButtonHTMLAttributes } from "react";
import cn from "classnames";
import buttonStyle from "./Button.module.scss";

type ButtonCloseProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
};

export const ButtonClose = (props: ButtonCloseProps) => {
  const { className, type, ...rest } = props;
  return <button className={cn(buttonStyle.buttonClose, className)} type={type || "button"} {...rest} />;
};
