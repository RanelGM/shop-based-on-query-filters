import { MutableRefObject } from "react";
import { Link, LinkProps } from "react-router-dom";
import cn from "classnames";
import { ButtonColor } from "../Button/Button";
import style from "../Button/Button.module.scss";

type ButtonLinkProps = LinkProps & {
  color?: ButtonColor;
  className?: string;
  icon?: JSX.Element;
  forwardRef?: MutableRefObject<HTMLAnchorElement>;
};

export const ButtonLink = (props: ButtonLinkProps) => {
  const { color, className, icon, forwardRef, children, ...rest } = props;

  return (
    <Link className={cn(style.button, className, color && style[`button--${color}`])} ref={forwardRef} {...rest}>
      {icon && <span className={style.iconWrapper}>{icon}</span>}
      {children}
    </Link>
  );
};
