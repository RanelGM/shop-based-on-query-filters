import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Map as MapType, Tooltip } from "leaflet";
import "leaflet/dist/leaflet.css";
import { City, Shop } from "types/shop";
import { Icon } from "components/Common/Icon/Icon";
import { customIcon } from "./markers";
import style from "./Map.module.scss";

type MapProps = {
  shops: Shop[];
  city: City;
};

export const Map = (props: MapProps) => {
  const { shops, city } = props;
  const [map, setMap] = useState<MapType | null>(null);

  useEffect(() => {
    // При изменении выбранного города, карта перемещается к нему
    if (map) {
      map.flyTo([city.latitude, city.longitude], city.zoom, { duration: 1.5 });
    }
  }, [map, city]);

  return (
    <MapContainer center={[city.latitude, city.longitude]} zoom={city.zoom} className={style.map} ref={setMap}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />

      <>
        {shops.map((shop) => (
          <Marker key={shop.id} position={[shop.latitude, shop.longitude]} icon={customIcon}>
            <Popup>
              <div className={style.popupContent}>
                <p>
                  <b>{shop.address}</b>
                </p>
                <p>
                  <Icon iconName="clock" />
                  <span>{shop.workTime}</span>
                </p>
                <p>
                  <Icon iconName="metro" />
                  <span>{shop.subway}</span>
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </>
    </MapContainer>
  );
};
