import cn from "classnames";
import style from "./Icon.module.scss";

type IconName = "search" | "cart" | "cross" | "telegram" | "github" | "mail";

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
    case "telegram":
      return (
        <svg className={cn(style.icon, className)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
          <path d="M248 8C111.033 8 0 119.033 0 256s111.033 248 248 248 248-111.033 248-248S384.967 8 248 8Zm114.952 168.66c-3.732 39.215-19.881 134.378-28.1 178.3-3.476 18.584-10.322 24.816-16.948 25.425-14.4 1.326-25.338-9.517-39.287-18.661-21.827-14.308-34.158-23.215-55.346-37.177-24.485-16.135-8.612-25 5.342-39.5 3.652-3.793 67.107-61.51 68.335-66.746.153-.655.3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283.746-104.608 69.142-14.845 10.194-26.894 9.934c-8.855-.191-25.888-5.006-38.551-9.123-15.531-5.048-27.875-7.717-26.8-16.291q.84-6.7 18.45-13.7 108.446-47.248 144.628-62.3c68.872-28.647 83.183-33.623 92.511-33.789 2.052-.034 6.639.474 9.61 2.885a10.452 10.452 0 0 1 3.53 6.716 43.765 43.765 0 0 1 .417 9.769Z" />
        </svg>
      );
    case "github":
      return (
        <svg className={cn(style.icon, className)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
          <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
        </svg>
      );
    case "mail":
      return (
        <svg className={cn(style.icon, className)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M464 64c26.5 0 48 21.49 48 48 0 15.1-7.1 29.3-19.2 38.4L275.2 313.6a32.1 32.1 0 0 1-38.4 0L19.2 150.4C7.113 141.3 0 127.1 0 112c0-26.51 21.49-48 48-48h416zM217.6 339.2a63.9 63.9 0 0 0 76.8 0L512 176v208c0 35.3-28.7 64-64 64H64c-35.35 0-64-28.7-64-64V176l217.6 163.2z" />
        </svg>
      );
    default:
      return <></>;
  }
};
