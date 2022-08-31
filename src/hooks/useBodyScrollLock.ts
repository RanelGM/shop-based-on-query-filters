import { useEffect } from "react";

type useBodyScrollLockProps = {
  condition: boolean;
};

export const useBodyScrollLock = ({ condition }: useBodyScrollLockProps) => {
  // Используется для отключения overflow у body по переданому условию

  useEffect(() => {
    if (condition) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [condition]);
};
