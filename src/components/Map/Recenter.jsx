import { useEffect } from "react";
import { useMap } from "react-leaflet";

const Recenter = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 13, { animate: true });
    }
  }, [position, map]);
  return null;
};

export default Recenter;
