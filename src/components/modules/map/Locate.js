import { useEffect } from "react";
import { useMap } from "react-leaflet";
import Locate from "leaflet.locatecontrol";

const LocateControl = ({ options }) => {
  const map = useMap();

  useEffect(() => {
    const lc = new Locate(options);
    lc.addTo(map);
  }, []);

  return null;
};

export default LocateControl
