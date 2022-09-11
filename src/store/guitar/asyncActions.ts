import { AsyncActionResult } from "store/store";
import { setPaginationCount } from "store/ui/actions";
import { Guitar } from "types/guitar";
import { setGuitars, setPrice } from "./actions";
import { APIRoute, MAX_GUITARS_FOR_PAGE, PAGINATION_COUNT_HEADER, Query, SortOrder, SortType } from "utils/constants";

const getURLForMinMaxPrice = (search: URLSearchParams, order: SortOrder) => {
  // Sort и Order будут заменены, а PriceFrom и PriceTo - удалены, т.к. определяется min и max цена по прочим search параметрам
  const copy = new URLSearchParams(search);
  copy.delete(Query.Sort);
  copy.delete(Query.Order);
  copy.delete(Query.PriceFrom);
  copy.delete(Query.PriceTo);
  copy.set(Query.Sort, SortType.Price);
  copy.set(Query.Order, order);
  return copy.toString();
};

export const loadGuitars = (currentPage: number, searchParams: URLSearchParams): AsyncActionResult => {
  return async (dispatch, _getState, axios) => {
    const limit = `&_start=${(currentPage - 1) * MAX_GUITARS_FOR_PAGE}&_limit=${MAX_GUITARS_FOR_PAGE}`;
    const params = searchParams ? `?${searchParams}&_embed=comments` : "?_embed=comments";

    const { data, headers } = await axios.get<Guitar[]>(`${APIRoute.Guitars}${params}${limit}`);

    const guitarsCount = Number(headers[PAGINATION_COUNT_HEADER]);
    let minPrice = 0;
    let maxPrice = 0;

    // Минимальная и максимальная цена устанавливается в плейсхолдере фильтров по диапазону цен
    // Сервером не предусмотрена передача минимальной и максимальной цены гитар (с учетом выбранных фильтров) в headers
    // Поэтому в случае, если кол-во гитар больше, чем загруженное (определяется MAX_GUITARS_FOR_PAGE) или была сортировка по цене
    // то делается доп. запрос на 1 гитару с самой высокой ценой и 1 гитару с самой низкой
    // Иначе определяется из тех цен, что уже загружены
    if (guitarsCount > MAX_GUITARS_FOR_PAGE || searchParams.get(Query.PriceFrom) || searchParams.get(Query.PriceTo)) {
      const minPriceParams = getURLForMinMaxPrice(searchParams, SortOrder.Asc);
      const maxPriceParams = getURLForMinMaxPrice(searchParams, SortOrder.Desc);
      const { data: minPriceGuitar } = await axios.get<Guitar[]>(`${APIRoute.Guitars}?${minPriceParams}&_limit=1`);
      const { data: maxPriceGuitar } = await axios.get<Guitar[]>(`${APIRoute.Guitars}?${maxPriceParams}&_limit=1`);
      minPrice = minPriceGuitar.length > 0 ? minPriceGuitar[0].price : 0;
      maxPrice = maxPriceGuitar.length > 0 ? maxPriceGuitar[0].price : 0;
    } else {
      const prices = data.map((guitar) => guitar.price);
      minPrice = prices.length > 0 ? Math.min(...prices) : 0;
      maxPrice = prices.length > 0 ? Math.max(...prices) : 0;
    }

    dispatch(setGuitars(data));
    dispatch(setPaginationCount(Math.ceil(guitarsCount / MAX_GUITARS_FOR_PAGE)));
    dispatch(setPrice({ min: minPrice, max: maxPrice }));
  };
};
