import leaflet from "leaflet";
import mapIcon from "assets/img/icons/mapIcon.svg";

const ICON_SIZE = {
  Width: 40,
  Height: 40,
};

export const customIcon = leaflet.icon({
  iconUrl: mapIcon,
  iconSize: [ICON_SIZE.Width, ICON_SIZE.Height],
  iconAnchor: [ICON_SIZE.Width / 2, ICON_SIZE.Height / 2],
});
