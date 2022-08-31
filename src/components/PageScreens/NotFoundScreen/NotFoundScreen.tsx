import { ButtonLink } from "components/Common/ButtonLink/ButtonLink";
import { Positioner } from "components/Common/Positioner/Positioner";
import { AppRoute } from "utils/constants";
import style from "./NotFoundScreen.module.scss";

export const NotFoundScreen = () => {
  return (
    <Positioner className={style.positioner}>
      <h1>Запрашиваемая страница не найдена</h1>

      <ButtonLink to={AppRoute.Catalog} color="white-black">
        Вернуться на главную
      </ButtonLink>
    </Positioner>
  );
};
