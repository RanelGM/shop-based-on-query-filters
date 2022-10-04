import { useSelector } from "react-redux";
import { Zoom, Pagination, Navigation, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/zoom";
import { Swiper, SwiperSlide } from "swiper/react";
import { getCurrentViewport } from "store/ui/selectors";
import "./Slider.scss";
import * as Slides from "assets/img/content/slides";
import style from "./Slider.module.scss";

const { ...slides } = Slides;

export const Slider = () => {
  const { isMobileVp } = useSelector(getCurrentViewport);

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      modules={[Zoom, Pagination, Navigation, Autoplay]}
      loop
      navigation={true}
      autoplay={{ delay: 5000 }}
      zoom={isMobileVp}
      pagination={{
        type: "bullets",
        clickable: true,
      }}
    >
      {Object.values(slides).map((slideURL) => (
        <SwiperSlide key={slideURL}>
          {isMobileVp ? (
            <div className="swiper-zoom-container">
              <img src={slideURL} alt="Изображение магазина" className={style.img} width={1024} height={400} />
            </div>
          ) : (
            <img src={slideURL} alt="Изображение магазина" className={style.img} width={1024} height={400} />
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
