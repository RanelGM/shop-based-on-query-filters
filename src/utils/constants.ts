export enum AppRoute {
  Main = "/",
  Catalog = "/catalog",
  Product = "/product",
  Cart = "/cart",
  Shops = "/shops",
  About = "/about",
}

export enum APIRoute {
  Guitars = "/guitars",
  Coupons = "/coupons",
}

export enum Query {
  Sort = "_sort",
  Order = "_order",
  Type = "type",
  String = "stringCount",
  PriceFrom = "price_gte",
  PriceTo = "price_lte",
}

export enum Viewport {
  Mobile = "Mobile",
  Tablet = "Tablet",
  Desktop = "Desktop",
}

export enum ViewportMaxWidth {
  Mobile = 767,
  Tablet = 1023,
}

export enum SortType {
  Price = "price",
  Rating = "rating",
}

export enum SortOrder {
  Asc = "asc",
  Desc = "desc",
}

export enum GuitarType {
  Acoustic = "acoustic",
  Electric = "electric",
  Ukulele = "ukulele",
}

export const HEADER_NAV_LINKS = [
  { id: "1", name: "Каталог", path: `${AppRoute.Catalog}/1` },
  { id: "2", name: "Наши магазины", path: AppRoute.Shops },
  { id: "3", name: "О компании", path: AppRoute.About },
] as const;

export const FOOTER_NAV_LINKS = [
  { id: "1", name: "Каталог", path: AppRoute.Catalog },
  { id: "2", name: "Наши магазины", path: AppRoute.Shops },
  { id: "3", name: "О компании", path: AppRoute.About },
  { id: "4", name: "Корзина", path: AppRoute.Cart },
] as const;

export const FOOTER_CONTACT_LINKS = [
  { id: "1", icon: "telegram", path: "https://t.me/nullnpc" },
  { id: "2", icon: "github", path: "https://github.com/RanelGM" },
  { id: "3", icon: "mail", path: "mailto:ranelgm@outlook.com" },
] as const;

export const GUITAR = {
  [GuitarType.Acoustic]: {
    id: "1",
    type: GuitarType.Acoustic,
    label: "Акустическая гитара",
    strings: ["6", "7", "12"],
  },
  [GuitarType.Electric]: {
    id: "2",
    type: GuitarType.Electric,
    label: "Электрогитара",
    strings: ["4", "6", "7"],
  },
  [GuitarType.Ukulele]: {
    id: "3",
    type: GuitarType.Ukulele,
    label: "Укулеле",
    strings: ["4"],
  },
} as const;

export const SORT_TYPES = [
  { id: SortType.Price, type: SortType.Price, label: "По цене" },
  { id: SortType.Rating, type: SortType.Rating, label: "По популярности" },
] as const;

export const SORT_ORDERS = [
  { id: SortOrder.Asc, type: SortOrder.Asc, label: "По возрастанию" },
  { id: SortOrder.Desc, type: SortOrder.Desc, label: "По убыванию" },
] as const;

export const ALL_GUITAR_TYPES = Object.values(GuitarType);
export const ALL_GUITAR_STRINGS = Array.from(
  new Set(
    Object.values(GUITAR).reduce((reducer, guitar) => {
      return reducer.concat(guitar.strings);
    }, [] as string[]),
  ),
);

export const MAX_GUITARS_FOR_PAGE = 9;
export const MAX_PAGINATION_COUNT = 3;
export const PAGINATION_COUNT_HEADER = "x-total-count";
export const MAX_CART_COUNT = 99;
export const MIN_CART_COUNT = 1;
