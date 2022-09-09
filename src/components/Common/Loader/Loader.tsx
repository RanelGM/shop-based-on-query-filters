import { Overlay } from "../Overlay/Overlay";
import style from "./Loader.module.scss";

export const Loader = () => {
  return (
    <Overlay className={style.overlay} scrollLock={false}>
      <div className={style.loader} />
    </Overlay>
  );
};
