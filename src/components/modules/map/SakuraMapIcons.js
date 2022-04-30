import L from "leaflet";

import SakuraIcon from "assets/images/cherry.svg";
import LocationIcon from "assets/images/location.png";

export const sakuraMarker = L.icon({
  iconUrl: SakuraIcon,
  iconSize: [50, 30],
  iconAnchor: [25, 0]
});

export const createClusterCustomIcon = (cluster) => {
  return L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: "marker-cluster-custom",
    iconSize: L.point(40, 40, true)
  });
};

const userIcon = L.icon({
  iconUrl: LocationIcon,
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",

  iconSize: [40, 40], // size of the icon
  shadowSize: [35, 35], // size of the shadow
  iconAnchor: [22, 21], // point of the icon which will correspond to marker's location
  shadowAnchor: [13, 23], // the same for the shadow
  popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});

export const LocationMarker = L.Marker.extend({
  initialize(latlng, options) {
      L.Util.setOptions(this, options);
      this._latlng = latlng;
      this.createIcon();
  },

  createIcon() {
      this.setIcon(userIcon);
  },

  setStyle(style) {
      L.Util.setOptions(this, style);
      this.createIcon();
  }
});