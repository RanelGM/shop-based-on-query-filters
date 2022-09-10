import { ChangeEvent, Dispatch, SetStateAction, useCallback } from "react";
import { Checkbox } from "components/Common/Checkbox/Checkbox";
import { FilterState } from "../Filter";
import { GUITAR } from "utils/constants";
import { updateArray } from "utils/utils";
import filterStyle from "../Filter.module.scss";

type GuitarTypesProps = {
  activeTypes: string[];
  setState: Dispatch<SetStateAction<FilterState>>;
};

export const GuitarTypes = (props: GuitarTypesProps) => {
  const { activeTypes, setState } = props;

  const onCheckboxChange = useCallback(
    ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
      // В id у currentTarget записан тип гитары
      setState((prevState) => ({ ...prevState, types: updateArray(prevState.types, currentTarget.id) }));
    },
    [setState],
  );

  return (
    <div className={filterStyle.filterWrapper}>
      <p className={filterStyle.legend}>Тип гитар</p>
      <ul className={filterStyle.list}>
        {Object.values(GUITAR).map((guitar) => {
          const { type, label } = guitar;
          const isChecked = activeTypes.includes(type);

          return (
            <li key={type}>
              <Checkbox id={type} label={label} checked={isChecked} onChange={onCheckboxChange} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
