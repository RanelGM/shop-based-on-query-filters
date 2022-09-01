import { Checkbox } from "components/Common/Checkbox/Checkbox";
import { ALL_GUITAR_STRINGS } from "utils/constants";
import filterStyle from "../Filter.module.scss";

export const GuitarStrings = () => {
  return (
    <div className={filterStyle.filterWrapper}>
      <p className={filterStyle.legend}>Количество струн</p>
      <ul className={filterStyle.list}>
        {ALL_GUITAR_STRINGS.map((string) => (
          <li key={string}>
            <Checkbox id={string} label={string} />
          </li>
        ))}
      </ul>
    </div>
  );
};
