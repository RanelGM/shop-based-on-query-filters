import { Viewport, ViewportMaxWidth } from "./constants";

export const checkViewport = () => {
  const width = window.innerWidth;

  switch (true) {
    case width <= ViewportMaxWidth.Mobile:
      return Viewport.Mobile;
    case width > ViewportMaxWidth.Mobile && width <= ViewportMaxWidth.Tablet:
      return Viewport.Tablet;
    default:
      return Viewport.Desktop;
  }
};

export const formatPrice = (price: number) => {
  return `${price.toLocaleString("ru")}\xa0₽`;
};

type Falsy = false | null | undefined | 0 | "";

export const getObjectTruthyValue = <Truthy>(object: Record<string, Truthy | Falsy>) => {
  // Принимает объект и возвращает объект с truthy значениями (не используется, если значения - другой объект)
  // Дженерик T исползьуется, чтбоы типизировать возвращаемые truthy значения (вернётся всё, что не Falsy)
  return Object.entries(object).reduce((accum, [key, value]) => {
    const isValueTruthy = value instanceof Array ? value.length > 0 : Boolean(value);
    if (isValueTruthy) {
      accum = { ...accum, [key]: value as Truthy };
    }
    return accum;
  }, {} as Record<string, Truthy>);
};
