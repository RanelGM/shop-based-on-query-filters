import cn from "classnames";
import style from "./Icon.module.scss";

type IconName = "search";

type IconProps = {
  iconName: IconName;
  className?: string;
};

export const Icon = ({ iconName, className }: IconProps) => {
  switch (iconName) {
    case "search":
      return (
        <svg className={cn(style.icon, className)} viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="m10.028 9.529 3.765 3.766a.706.706 0 0 1-.998.998l-3.766-3.766a5.6 5.6 0 1 1 .998-.998Zm-4.428.77a4.2 4.2 0 1 0 0-8.399 4.2 4.2 0 0 0 0 8.4Z"
          />
        </svg>
      );

    default:
      return <></>;
  }
};
