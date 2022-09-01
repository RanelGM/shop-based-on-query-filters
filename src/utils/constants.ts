export enum AppRoute {
  Catalog = "/",
  Product = "/product",
  Cart = "/cart",
  Shops = "/shops",
  About = "/about",
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

export enum GuitarType {
  Acoustic = "acoustic",
  Electric = "electric",
  Ukulele = "ukulele",
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

export const GUITAR = {
  Acoustic: { id: "1", type: GuitarType.Acoustic, label: "Акустическая гитара", strings: ["6", "7", "12"] },
  Electric: { id: "2", type: GuitarType.Electric, label: "Электрогитара", strings: ["4", "6", "7"] },
  Ukulele: { id: "3", type: GuitarType.Ukulele, label: "Укулеле", strings: ["4"] },
} as const;

export const ALL_GUITAR_TYPES = Object.values(GuitarType);
export const ALL_GUITAR_STRINGS = Array.from(
  new Set(
    Object.values(GUITAR).reduce((reducer, guitar) => {
      return reducer.concat(guitar.strings);
    }, [] as string[]),
  ),
);
