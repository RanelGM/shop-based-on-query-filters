export enum AppRoute {
  Catalog = "/",
  Product = "/product",
  Cart = "/cart",
  Shops = "/shops",
  About = "/about",
}

export const HEADER_NAV_LINKS = [
  { id: "1", name: "Каталог", path: AppRoute.Catalog },
  { id: "2", name: "Наши магазины", path: AppRoute.Shops },
  { id: "3", name: "О компании", path: AppRoute.About },
];
