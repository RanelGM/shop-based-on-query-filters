import cn from "classnames";
import style from "./Icon.module.scss";

type IconName = "search" | "cart" | "cross";

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
    case "cart":
      return (
        <svg className={cn(style.icon, className)} viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
          <path d="M13.38 4.593a.518.518 0 0 0-.171-.152.436.436 0 0 0-.21-.055h-3V2.023c0-.47-.157-.921-.439-1.254C9.28.437 8.898.25 8.5.25h-3c-.398 0-.78.187-1.06.52-.282.332-.44.783-.44 1.253v2.363H1a.435.435 0 0 0-.21.052.516.516 0 0 0-.173.151.63.63 0 0 0-.103.223.695.695 0 0 0-.014.254l.94 7.18c.036.281.157.538.34.723a.912.912 0 0 0 .66.28h9.13a.913.913 0 0 0 .659-.28c.184-.185.305-.442.34-.724l.93-7.18a.695.695 0 0 0-.015-.251.627.627 0 0 0-.104-.22ZM5 2.023a.65.65 0 0 1 .146-.418.465.465 0 0 1 .354-.173h3c.132 0 .26.062.353.173A.65.65 0 0 1 9 2.023v2.363H5V2.023Zm6.57 10.045H2.43l-.845-6.5h10.83l-.845 6.5Z" />
        </svg>
      );
    case "cross":
      return (
        <svg className={cn(style.icon, className)} fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
          <path d="M13.77 14.835 9 10.057l-4.77 4.778-1.065-1.065L7.943 9 3.165 4.23 4.23 3.165 9 7.943l4.77-4.77 1.058 1.057L10.058 9l4.77 4.77-1.058 1.065Z" />
        </svg>
      );

    default:
      return <></>;
  }
};
