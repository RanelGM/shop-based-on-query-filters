import { Checkbox } from "components/Common/Checkbox/Checkbox";
import { GUITAR } from "utils/constants";
import filterStyle from "../Filter.module.scss";

export const GuitarTypes = () => {
  return (
    <div className={filterStyle.filterWrapper}>
      <p className={filterStyle.legend}>Тип гитар</p>
      <ul className={filterStyle.list}>
        {Object.values(GUITAR).map((guitar) => (
          <li key={guitar.type}>
            <Checkbox id={guitar.type} label={guitar.label} />
          </li>
        ))}
      </ul>
    </div>
  );
};
