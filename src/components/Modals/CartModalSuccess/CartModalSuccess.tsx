import { MutableRefObject } from "react";
import { Button } from "components/Common/Button/Button";
import { ButtonLink } from "components/Common/ButtonLink/ButtonLink";
import { Icon } from "components/Common/Icon/Icon";
import { Overlay } from "components/Common/Overlay/Overlay";
import { AppRoute } from "utils/constants";
import style from "./CartModalSuccess.module.scss";

type CartModalSuccessProps = {
  componentRef: MutableRefObject<HTMLDivElement | null>;
  onModalClose: () => void;
};

export const CartModalSuccess = (props: CartModalSuccessProps) => {
  const { componentRef, onModalClose } = props;

  return (
    <Overlay className={style.overlay}>
      <div className={style.component} ref={componentRef}>
        <p className={style.text}>Товар успешно добавлен в корзину</p>
        <div className={style.buttonsWrapper}>
          <ButtonLink color="white-red" to={AppRoute.Cart}>
            Перейти в корзину
          </ButtonLink>
          <Button color="white-black" onClick={onModalClose}>
            Продолжить покупки
          </Button>
        </div>
      </div>
    </Overlay>
  );
};
