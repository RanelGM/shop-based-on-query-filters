import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GuitarStrings } from "./GuitarStrings/GuitarStrings";
import { GuitarTypes } from "./GuitarTypes/GuitarTypes";
import { PriceRange } from "./PriceRange/PriceRange";
import { Query } from "utils/constants";
import style from "./Filter.module.scss";

export type FilterState = {
  types: string[];
  strings: string[];
};

const getDefaultState = (searchParams: URLSearchParams): FilterState => ({
  types: searchParams.getAll(Query.Type),
  strings: searchParams.getAll(Query.String),
});

export const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useState<FilterState>(getDefaultState(searchParams));
  const { types } = state;

  useEffect(() => {
    // Установление search параметров для типов гитар
    searchParams.delete(Query.Type);
    types.forEach((type) => searchParams.append(Query.Type, type));

    setSearchParams(searchParams);
  }, [searchParams, setSearchParams, types]);

  return (
    <section className={style.component}>
      <h2 className={style.heading}>Фильтры</h2>
      <PriceRange />
      <GuitarTypes activeTypes={types} setState={setState} />
      <GuitarStrings />
    </section>
  );
};
