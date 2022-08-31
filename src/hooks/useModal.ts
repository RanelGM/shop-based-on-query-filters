import { useState, useEffect, useMemo } from "react";

type ModalProps = {
  componentRef?: React.MutableRefObject<HTMLElement | null>;
  isClickCapture?: boolean;
  isKeydownCapture?: boolean;
  isOverflowHidden?: boolean;
};

type ModalCallback = {
  toggleModal: () => void;
  closeModal: () => void;
  openModal: () => void;
};

type ModalResult = [boolean, ModalCallback];

export const useModal = (props: ModalProps): ModalResult => {
  const { componentRef, isClickCapture, isKeydownCapture, isOverflowHidden } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onOutsideClick = (evt: MouseEvent) => {
    const isClickInside = componentRef?.current && componentRef?.current.contains(evt.target as Node);

    if (!isModalOpen || isClickInside) {
      return;
    }

    if (isClickCapture) {
      // Предотвращает всплытие по клику, если предоставлен isClickCapture = true
      evt.stopPropagation();
    }

    setIsModalOpen(false);
  };

  const onEscKeydown = (evt: KeyboardEvent) => {
    const isEscKey = evt.key === "Escape" || evt.key === "Esc";

    if (!isModalOpen || !isEscKey) {
      return;
    }

    if (isKeydownCapture) {
      // Предотвращает всплытие по клавише, если предоставлен isKeydownCapture = true
      evt.stopPropagation();
    }

    setIsModalOpen(false);
  };

  // Добавляет закрытие модального окна / селекта по клавише Esc (всегда)
  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("keydown", onEscKeydown, { capture: isKeydownCapture });
      return () => {
        document.removeEventListener("keydown", onEscKeydown, { capture: isKeydownCapture });
      };
    }
  }, [isKeydownCapture, isModalOpen, onEscKeydown]);

  // Добавляет закрытие модального окна / селекта по клику за пределы блока (если предоставлен componentRef)
  useEffect(() => {
    if (isModalOpen && componentRef) {
      document.addEventListener("click", onOutsideClick, { capture: isClickCapture });
      return () => {
        document.removeEventListener("click", onOutsideClick, { capture: isClickCapture });
      };
    }
  }, [componentRef, isClickCapture, isModalOpen, onOutsideClick]);

  return useMemo(() => {
    const toggleModal = () => setIsModalOpen((prevState) => !prevState);
    const closeModal = () => setIsModalOpen(false);
    const openModal = () => setIsModalOpen(true);

    const modalCallbacks = {
      toggleModal,
      closeModal,
      openModal,
    };

    return [isModalOpen, modalCallbacks];
  }, [isModalOpen]);
};

export default useModal;
