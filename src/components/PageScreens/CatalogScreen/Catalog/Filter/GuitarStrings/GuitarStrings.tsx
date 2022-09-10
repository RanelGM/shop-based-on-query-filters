import { ChangeEvent, Dispatch, SetStateAction, useCallback } from "react";
import { Checkbox } from "components/Common/Checkbox/Checkbox";
import { FilterState } from "../Filter";
import { ALL_GUITAR_STRINGS } from "utils/constants";
import { updateArray } from "utils/utils";
import filterStyle from "../Filter.module.scss";

type GuitarStringsProps = {
  activeStrings: string[];
  allowedStrings: string[];
  setState: Dispatch<SetStateAction<FilterState>>;
};

export const GuitarStrings = (props: GuitarStringsProps) => {
  const { activeStrings, allowedStrings, setState } = props;

  const onCheckboxChange = useCallback(
    ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
      // В id у currentTarget записан номер струны
      setState((prevState) => ({ ...prevState, strings: updateArray(prevState.strings, currentTarget.id) }));
    },
    [setState],
  );

  return (
    <div className={filterStyle.filterWrapper}>
      <p className={filterStyle.legend}>Количество струн</p>
      <ul className={filterStyle.list}>
        {ALL_GUITAR_STRINGS.map((string) => {
          const isChecked = activeStrings.includes(string);
          // В случае, если был выбран тип гитары, у которого текущая струна недопустима, то checkbox блокируется
          const isDisabled = !allowedStrings.includes(string);

          return (
            <li key={string}>
              <Checkbox
                id={string}
                label={string}
                checked={isChecked}
                disabled={isDisabled}
                onChange={onCheckboxChange}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
