import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useRoutes } from "react-router-dom";
import { setViewport } from "store/ui/actions";
import { getCurrentViewport, getError } from "store/ui/selectors";
import { Footer } from "components/Common/Footer/Footer";
import { Header } from "components/Common/Header/Header";
import { ErrorModal } from "components/Modals/ErrorModal/ErrorModal";
import { AboutScreen } from "components/PageScreens/AboutScreen/AboutScreen";
import { CartScreen } from "components/PageScreens/CartScreen/CartScreen";
import { CatalogScreen } from "components/PageScreens/CatalogScreen/CatalogScreen";
import { MainScreen } from "components/PageScreens/MainScreen/MainScreen";
import { NotFoundScreen } from "components/PageScreens/NotFoundScreen/NotFoundScreen";
import { ProductScreen } from "components/PageScreens/ProductScreen/ProductScreen";
import { ShopsScreen } from "components/PageScreens/ShopsScreen/ShopsScreen";
import { AppRoute } from "utils/constants";
import { checkViewport } from "utils/utils";
import style from "./App.module.scss";

const APP_ROUTES = [
  { path: AppRoute.Main, element: <MainScreen /> },
  { path: `${AppRoute.Catalog}/:page`, element: <CatalogScreen /> },
  { path: `${AppRoute.Product}/:id`, element: <ProductScreen /> },
  { path: AppRoute.Cart, element: <CartScreen /> },
  { path: AppRoute.Shops, element: <ShopsScreen /> },
  { path: AppRoute.About, element: <AboutScreen /> },
  { path: "*", element: <NotFoundScreen /> },
];

const AppRoutes = () => useRoutes(APP_ROUTES);

const App = () => {
  const { currentViewport } = useSelector(getCurrentViewport);
  const error = useSelector(getError);
  const dispatch = useDispatch();

  useEffect(() => {
    // Используется для проверки текущего вьюпорта и установления в store актуального значения
    // На верхнем уровне App, а не хуком, чтобы resize на window навешивался 1 раз
    const updateViewport = () => {
      const viewport = checkViewport();

      if (viewport === currentViewport) {
        return;
      }

      dispatch(setViewport(viewport));
    };

    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, [currentViewport, dispatch]);

  return (
    <div className={style.component}>
      {error && <ErrorModal error={error} />}
      <Header />
      <main className={style.main}>
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
};

export default App;
