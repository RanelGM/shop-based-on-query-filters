import { GuitarCard } from "./GuitarCard/GuitarCard";
import { Sort } from "./Sort/Sort";
import style from "./Catalog.module.scss";

export const Catalog = () => {
  const mockGuitarCount = 9;

  return (
    <section className={style.component}>
      <Sort />
      <ul className={style.guitarsList}>
        {Array.from({ length: mockGuitarCount }, (item, index) => (
          <li key={index}>
            <GuitarCard />
          </li>
        ))}
      </ul>
    </section>
  );
};
