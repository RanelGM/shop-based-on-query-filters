import cn from "classnames";
import style from "./Positioner.module.scss";

type PositionerProps = {
  children: JSX.Element | JSX.Element[];
  className?: string;
};

export const Positioner = (props: PositionerProps) => {
  const { children, className } = props;

  return <div className={cn(style.component, className)}>{children}</div>;
};
