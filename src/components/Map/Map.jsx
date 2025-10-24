import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";

import "leaflet/dist/leaflet.css";
import styles from "./Map.module.scss";

function Recenter({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 13, { animate: true });
    }
  }, [position, map]);
  return null;
}

function MapControls({ initialPosition, setCurrentPosition, theme, setTheme }) {
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
        {theme === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
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
}

export default function Map() {
  const [currentPosition, setCurrentPosition] = useState([
    55.751244, 37.618423,
  ]);
  const [initialPosition, setInitialPosition] = useState(null);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = [pos.coords.latitude, pos.coords.longitude];
          setCurrentPosition(coords);
          setInitialPosition(coords);
        },
        (err) => console.warn("Geolocation error:", err.message),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }
  }, []);

  const mapThemes = {
    dark: {
      url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      attribution:
        '&copy; <a href="https://carto.com/">CARTO</a> | © OpenStreetMap',
    },
    light: {
      url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      attribution:
        '&copy; <a href="https://carto.com/">CARTO</a> | © OpenStreetMap',
    },
  };

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={currentPosition}
        zoom={13}
        scrollWheelZoom
        className={styles.map}
      >
        <TileLayer
          attribution={mapThemes[theme].attribution}
          url={mapThemes[theme].url}
        />
        <Recenter position={currentPosition} />
        <MapControls
          initialPosition={initialPosition}
          currentPosition={currentPosition}
          setCurrentPosition={setCurrentPosition}
          theme={theme}
          setTheme={setTheme}
        />
      </MapContainer>
    </div>
  );
}
