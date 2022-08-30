import { Footer } from "components/Common/Footer/Footer";
import { Header } from "components/Common/Header/Header";
import style from "./App.module.scss";

const App = () => {
  return (
    <div className={style.component}>
      <Header />
      <main className={style.main}></main>
      <Footer />
    </div>
  );
};

export default App;
