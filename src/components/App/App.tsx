import { useRoutes } from "react-router-dom";
import { Footer } from "components/Common/Footer/Footer";
import { Header } from "components/Common/Header/Header";
import { Positioner } from "components/Common/Positioner/Positioner";
import { NotFoundScreen } from "components/PageScreens/NotFoundScreen/NotFoundScreen";
import style from "./App.module.scss";

const APP_ROUTES = [{ path: "*", element: <NotFoundScreen /> }];

const AppRoutes = () => useRoutes(APP_ROUTES);

const App = () => {
  return (
    <div className={style.component}>
      <Header />
      <main className={style.main}>
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
};

export default App;
