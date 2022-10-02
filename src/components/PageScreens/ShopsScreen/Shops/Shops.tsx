import { MouseEvent, useMemo, useState } from "react";
import { City, Shop } from "types/shop";
import { Button } from "components/Common/Button/Button";
import { Map } from "./Map/Map";
import style from "./Shops.module.scss";

type ShopsProps = {
  shops: Shop[];
  userCity: City;
};

export const Shops = (props: ShopsProps) => {
  const { shops, userCity } = props;
  const [currentCity, setCurrentCity] = useState<City>(userCity);

  const cities = useMemo(
    () =>
      shops.reduce((reducer, shop) => {
        const isCityExist = reducer.some(
          (prev) => prev.latitude === shop.city.latitude || prev.longitude === shop.city.longitude,
        );

        if (!isCityExist) {
          reducer.push(shop.city);
        }

        return reducer;
      }, [] as City[]),
    [shops],
  );

  const onCityClick = ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    const city = cities.find((item) => item.name === currentTarget.id);

    if (city) {
      setCurrentCity(city);
    }

    currentTarget.blur();
  };

  return (
    <div>
      <ul className={style.cityList}>
        {cities.map((city) => {
          const isCityActive = city.name === currentCity.name;

          return (
            <li key={city.name}>
              <Button
                id={city.name}
                className={style.cityButton}
                onClick={onCityClick}
                color={isCityActive ? "red" : undefined}
              >
                {city.name}
              </Button>
            </li>
          );
        })}
      </ul>

      <Map shops={shops} city={currentCity} />
    </div>
  );
};
