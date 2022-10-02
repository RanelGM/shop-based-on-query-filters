import { Shop } from "types/shop";

const MoscowCoords = {
  name: "Москва",
  latitude: 55.754005989515804,
  longitude: 37.62027845256808,
  zoom: 12,
};

const SaintPetersburgCoords = {
  name: "Санкт-Петербург",
  latitude: 59.94073152778817,
  longitude: 30.31352560598548,
  zoom: 10,
};

const KazanCoords = {
  name: "Казань",
  latitude: 55.798979785266994,
  longitude: 49.10513787438753,
  zoom: 12,
};

export const shopsMock: Shop[] = [
  {
    id: "1",
    latitude: 55.7720354704148,
    longitude: 37.60198736715862,
    address: "г. Москва, ул. Садовая-Триумфальная, 16",
    workTime: "понедельник - пятница 10:00 - 20:00",
    subway: "Маяковская",
    city: MoscowCoords,
  },
  {
    id: "2",
    latitude: 55.74596914646086,
    longitude: 37.6269883674213,
    address: "г. Москва, ул. Пятницкая, 5",
    workTime: "понедельник - суббота 10:00 - 18:00",
    subway: "Новокузнецкая",
    city: MoscowCoords,
  },
  {
    id: "3",
    latitude: 59.92334633623423,
    longitude: 30.34967960134949,
    address: "г. Санкт-Петербург, ул. Марата, 53",
    workTime: "понедельник - пятница 10:00 - 20:00",
    subway: "Лиговский проспект",
    city: SaintPetersburgCoords,
  },
  {
    id: "4",
    latitude: 59.87701687952769,
    longitude: 30.255781882281184,
    address: "г. Санкт-Петербург, пл. Стачек, 57",
    workTime: "понедельник - суббота 10:00 - 18:00",
    subway: "Кировский завод",
    city: SaintPetersburgCoords,
  },
  {
    id: "5",
    latitude: 55.818409150996104,
    longitude: 49.11136292074559,
    address: "г. Казань, ул. Чистопольская, 20а",
    workTime: "понедельник - пятница 10:00 - 20:00",
    subway: "Козья слобода",
    city: KazanCoords,
  },
  {
    id: "6",
    latitude: 55.78974649287235,
    longitude: 49.12371423742305,
    address: "г. Казань, ул. Пушкина, 19",
    workTime: "понедельник - суббота 10:00 - 18:00",
    subway: "Площадь Габдуллы Тукая",
    city: KazanCoords,
  },
];
