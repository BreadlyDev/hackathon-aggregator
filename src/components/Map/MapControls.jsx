import React from "react";
import { useMap } from "react-leaflet";
import styles from "./Map.module.scss";

import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";

const MapControls = ({
  initialPosition,
  setCurrentPosition,
  theme,
  setTheme,
}) => {
  const map = useMap();

  const handleReturnToInitial = () => {
    if (initialPosition) {
      map.setView(initialPosition, 13, { animate: true });
      setCurrentPosition([...initialPosition]);
    }
  };

  const zoomIn = () => map.setZoom(map.getZoom() + 1);
  const zoomOut = () => map.setZoom(map.getZoom() - 1);

  return (
    <div className={styles.mapControls}>
      <button
        className={`${styles.mapBtn} ${styles.themeToggle}`}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        title="Toggle Theme"
      >
        {theme === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
      </button>

      <button
        className={`${styles.mapBtn} ${styles.recenter}`}
        onClick={handleReturnToInitial}
        title="Return to Initial Position"
      >
        <GpsFixedIcon />
      </button>

      <div className={styles.zoomControls}>
        <button className={styles.mapBtn} onClick={zoomIn} title="Zoom In">
          <ZoomInIcon />
        </button>
        <button className={styles.mapBtn} onClick={zoomOut} title="Zoom Out">
          <ZoomOutIcon />
        </button>
      </div>
    </div>
  );
};

export default MapControls;
