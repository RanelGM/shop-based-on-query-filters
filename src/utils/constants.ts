export enum AppRoute {
  Catalog = "/",
  Product = "/product",
  Cart = "/cart",
  Shops = "/shops",
  About = "/about",
}

export enum ViewPortMaxWidth {
  Mobile = 767,
  Tablet = 1023,
}

export const HEADER_NAV_LINKS = [
  { id: "1", name: "Каталог", path: AppRoute.Catalog },
  { id: "2", name: "Наши магазины", path: AppRoute.Shops },
  { id: "3", name: "О компании", path: AppRoute.About },
] as const;

export const FOOTER_NAV_LINKS = [
  { id: "1", name: "Каталог", path: AppRoute.Catalog },
  { id: "2", name: "Наши магазины", path: AppRoute.Shops },
  { id: "3", name: "О компании", path: AppRoute.About },
] as const;

export const FOOTER_CONTACT_LINKS = [
  { id: "1", icon: "telegram", path: "https://t.me/nullnpc" },
  { id: "2", icon: "github", path: "https://github.com/RanelGM" },
  { id: "3", icon: "mail", path: "mailto:ranelgm@outlook.com" },
] as const;
