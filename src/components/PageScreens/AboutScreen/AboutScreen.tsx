import { Link } from "react-router-dom";
import { Positioner } from "components/Common/Positioner/Positioner";
import { Slider } from "./Slider/Slider";
import { AppRoute } from "utils/constants";
import style from "./AboutScreen.module.scss";

export const AboutScreen = () => {
  return (
    <Positioner>
      <h1 className={style.heading}>О нас</h1>
      <div>
        <p>
          Когда вы посещаете наш магазин, вы не только найдёте большой выбор гитар, но и узнаете, насколько наша команда
          увлечена гитарами, игрой на гитаре и всем, что связано с музыкой.
        </p>
        <p>
          Приходите в <Link to={AppRoute.Shops}>один из магазинов</Link> и попробуйте наши инструменты, чтобы получить
          представление о каждой гитаре, которую мы предлагаем.
        </p>
        <p>Индивидуальный подход к каждому посетителю поможет найти ту гитару, которая идеально подходит для вас!</p>
      </div>
      <Slider />
    </Positioner>
  );
};
