import { GuitarStrings } from "./GuitarStrings/GuitarStrings";
import { GuitarTypes } from "./GuitarTypes/GuitarTypes";
import { PriceRange } from "./PriceRange/PriceRange";
import style from "./Filter.module.scss";

export const Filter = () => {
  return (
    <section className={style.component}>
      <h2 className={style.heading}>Фильтры</h2>
      <PriceRange />
      <GuitarTypes />
      <GuitarStrings />
    </section>
  );
};
