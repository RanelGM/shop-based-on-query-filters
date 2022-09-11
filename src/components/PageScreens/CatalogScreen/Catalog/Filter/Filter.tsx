import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { GuitarStrings } from "./GuitarStrings/GuitarStrings";
import { GuitarTypes } from "./GuitarTypes/GuitarTypes";
import { PriceRange } from "./PriceRange/PriceRange";
import { ALL_GUITAR_STRINGS, ALL_GUITAR_TYPES, GUITAR, GuitarType, Query } from "utils/constants";
import style from "./Filter.module.scss";

export type FilterState = {
  types: string[];
  strings: string[];
  price: {
    from: string;
    to: string;
  };
};

const getDefaultState = (searchParams: URLSearchParams): FilterState => ({
  types: searchParams.getAll(Query.Type),
  strings: searchParams.getAll(Query.String),
  price: {
    from: searchParams.get(Query.PriceFrom) || "",
    to: searchParams.get(Query.PriceTo) || "",
  },
});

const getAllowedStrings = (types: string[]) => {
  // Фильтрует пришедшие типы на допустимые (включены в enum GuitarType, который формирует ALL_GUITAR_TYPES)
  const allowedTypes = types.filter((type) => ALL_GUITAR_TYPES.includes(type as GuitarType)) as GuitarType[];
  // Получает массивы допустимых струн для каждого из типов
  const allowedStrings = allowedTypes.map((type) => GUITAR[type].strings);
  // Возвращает массив уникальных допустимых струн
  return Array.from(new Set(allowedStrings.flat()));
};

export const Filter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useState<FilterState>(getDefaultState(searchParams));
  const { types, strings, price } = state;

  // В случае, если выбран тип гитар, то происходит проверка на допустимые струны. Если нет, то все струны допустимы
  const allowedStrings = useMemo(() => (types.length > 0 ? getAllowedStrings(types) : ALL_GUITAR_STRINGS), [types]);

  const updateSearchParams = useCallback(() => {
    // В случае, если в стейте выбраны (поставлен чекбокс) струны, которые не допустимы для выбранных типов гитар,
    // тогда из выбранных струн в стейт устанавливаются только допустимые,
    // также происходит выход из функции и она повторно запускается после смены стейта для установки корректных searchParams
    const isStringsNotAllowed = strings.some((string) => !allowedStrings.includes(string));

    if (isStringsNotAllowed) {
      const allowedCheckedStrings = strings.filter((string) => allowedStrings.includes(string));
      setState((prevState) => ({ ...prevState, strings: allowedCheckedStrings }));
      return;
    }

    // Установление search параметров для типов гитар
    searchParams.delete(Query.Type);
    types.forEach((type) => searchParams.append(Query.Type, type));

    // Установление search параметров для струн гитар
    searchParams.delete(Query.String);
    strings.forEach((string) => searchParams.append(Query.String, string));

    // Цены устанавливаются сами внутри своего компонента в момент блюра инпута

    setSearchParams(searchParams);
  }, [allowedStrings, searchParams, setSearchParams, strings, types]);

  useEffect(() => {
    updateSearchParams();
  }, [updateSearchParams]);

  return (
    <section className={style.component}>
      <h2 className={style.heading}>Фильтры</h2>
      <PriceRange activePrice={price} setState={setState} />
      <GuitarTypes activeTypes={types} setState={setState} />
      <GuitarStrings activeStrings={strings} allowedStrings={allowedStrings} setState={setState} />
    </section>
  );
};
