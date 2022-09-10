import { Viewport, ViewportMaxWidth } from "./constants";

export const checkViewport = () => {
  // Проверяет текущий вьюпорт
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
  // Форматирует число в строку с разделителями каждые 3 знака и ₽ в конце
  return `${price.toLocaleString("ru")}\xa0₽`;
};

export const updateArray = <T>(array: T[], item: T): T[] => {
  // Обновляет копию массива. Если элемента нет внутри массива, то добавляет. Если есть, то удаляет
  const updatingArray = array.slice();
  const itemIndex = updatingArray.indexOf(item);

  if (itemIndex < 0) {
    updatingArray.push(item);
  } else {
    updatingArray.splice(itemIndex, 1);
  }

  return updatingArray;
};
