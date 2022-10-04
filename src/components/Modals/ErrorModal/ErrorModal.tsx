import { useRef } from "react";
import { useDispatch } from "react-redux";
import { AxiosError } from "axios";
import { setError } from "store/ui/actions";
import { Button } from "components/Common/Button/Button";
import { Overlay } from "components/Common/Overlay/Overlay";
import style from "./ErrorModal.module.scss";

type ErrorModalProps = {
  error: AxiosError;
};

export const ErrorModal = ({ error }: ErrorModalProps) => {
  const dispatch = useDispatch();
  const componentRef = useRef<HTMLDivElement | null>(null);
  const onModalClose = () => dispatch(setError(null));

  return (
    <Overlay className={style.overlay}>
      <div className={style.component} ref={componentRef}>
        <p className={style.text}>Ошибка: {error.message || error.code}</p>
        <p className={style.text}>Попробуйте немного позднее</p>
        <div className={style.buttonsWrapper}>
          <Button color="white-black" onClick={onModalClose}>
            Закрыть
          </Button>
        </div>
      </div>
    </Overlay>
  );
};
