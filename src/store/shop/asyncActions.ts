import { AsyncActionResult } from "store/store";
import { City, Shop } from "types/shop";
import { setShops, setUserCity } from "./actions";
import { shopsMock } from "utils/mocks";

const requestToServerMock = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const loadShops = (): AsyncActionResult => {
  return async (dispatch, _getState) => {
    // Загрузка точек магазинов не предусмотрена, поэтому используются моковые значения
    await requestToServerMock(500);
    const data: Shop[] = shopsMock;

    if (data.length === 0) {
      return;
    }

    const cities = data.map((shop) => shop.city);
    const [firstCity] = cities;

    const userCity = await new Promise<City>((resolve) => {
      // Используется геолокация для определения какой город показать пользователю на карте
      // Если геолокация в устройстве поддерживается, и разрешение дано - находит ближайший город из списка городов
      // Если нет, то устанавливает самый первый город из списка
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (geoposition) => {
            const { latitude, longitude } = geoposition.coords;

            const closestCity = cities.reduce((reducer, city) => {
              const current = Math.abs(city.latitude - latitude + city.longitude - longitude);
              const prev = Math.abs(reducer.latitude - latitude + reducer.longitude - longitude);

              return current < prev ? city : reducer;
            }, firstCity);

            resolve(closestCity);
          },
          (_error) => {
            resolve(firstCity);
          },
        );
      } else {
        return firstCity;
      }
    });

    dispatch(setUserCity(userCity));
    dispatch(setShops(data));
  };
};
