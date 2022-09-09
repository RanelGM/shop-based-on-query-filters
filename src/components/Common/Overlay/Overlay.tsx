import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import FocusLock from "react-focus-lock";
import style from "./Overlay.module.scss";

type OverlayProps = {
  children?: ReactNode;
  autoFocus?: boolean;
  scrollLock?: boolean;
  className?: string;
};

export const Overlay = (props: OverlayProps) => {
  const { children, autoFocus = false, scrollLock = true, className } = props;

  const containerRef = useRef(document.createElement("div"));
  containerRef.current.classList.add(style.overlay);

  if (className) {
    containerRef.current.classList.add(className);
  }

  // Создание контейнера
  useEffect(() => {
    const addContainer = () => {
      document.body.appendChild(containerRef.current);
    };

    const removeContainer = () => {
      document.body.removeChild(containerRef.current);
    };

    addContainer();
    return () => removeContainer();
  }, [containerRef]);

  // Добавляет scrollLock на body, по умолчанию - всегда, если не передано обратное
  useEffect(() => {
    if (scrollLock) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [scrollLock]);

  // В случае, если в компонент Overlay передать children - они будут обернуты как с оверлеем, так и с FocusLock
  // В случае, если в компонент ничего не передавать - будет только оверлей

  return createPortal(
    // В случае, если прямо не передавать autoFocus = false в FocusLock
    // То он установит его как true (что снизит usability согласно eslint jsx-a11y)
    // Поэтому по умолчанию в пропсах autoFocus = false, что передается в FocusLock, а правило для строки - комментируется

    // eslint-disable-next-line jsx-a11y/no-autofocus
    <FocusLock autoFocus={autoFocus}>{children}</FocusLock> || "",
    containerRef.current,
  );
};
