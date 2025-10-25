import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  useMap,
  Circle,
  Marker,
  Tooltip,
  Popup,
} from "react-leaflet";

import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import HomeIcon from "@mui/icons-material/Home";
import StoreIcon from "@mui/icons-material/Store";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import "leaflet/dist/leaflet.css";
import styles from "./Map.module.scss";
import { renderToStaticMarkup } from "react-dom/server";
import { getShopItemsRequest } from "../../api/api";

/* =======================  ИКОНКИ  ======================= */

// 🏠 Иконка пользователя
const userIconMarkup = renderToStaticMarkup(
  <HomeIcon style={{ color: "#ff6699", fontSize: "30px" }} />
);
const homeIcon = new L.DivIcon({
  html: userIconMarkup,
  className: "",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

// 🏬 Иконка магазина
const storeIconMarkup = renderToStaticMarkup(
  <StoreIcon style={{ color: "#2b67f6", fontSize: "28px" }} />
);
const storeIcon = new L.DivIcon({
  html: storeIconMarkup,
  className: "",
  iconSize: [28, 28],
  iconAnchor: [14, 28],
});

// 📍 Иконка филиала магазина
const locationIconMarkup = renderToStaticMarkup(
  <LocationOnIcon style={{ color: "#e63946", fontSize: "28px" }} />
);
const locationIcon = new L.DivIcon({
  html: locationIconMarkup,
  className: "",
  iconSize: [28, 28],
  iconAnchor: [14, 28],
});

/* =======================  ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ  ======================= */

// Центровка карты
function Recenter({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, 13, { animate: true });
    }
  }, [position, map]);
  return null;
}

// Контролы карты
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
}

/* =======================  ОСНОВНОЙ КОМПОНЕНТ  ======================= */

export default function Map({
  radius,
  currentPosition,
  setCurrentPosition,
  shopsWithBranches,
  searchFilter,
}) {
  const [initialPosition, setInitialPosition] = useState(null);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = [pos.coords.latitude, pos.coords.longitude];
          setCurrentPosition(coords);
          setInitialPosition(coords);
        },
        (err) => {
          console.warn("Geolocation error", err.code, err.message);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    }
  }, []);

  const CenterToShops = ({ shopsWithBranches }) => {
    const map = useMap();

    useEffect(() => {
      if (!shopsWithBranches?.length) return;

      const allBranches = shopsWithBranches.flatMap((s) =>
        s.branches.map((b) => [b.latitude, b.longitude])
      );

      if (allBranches.length > 0) {
        const center = L.latLngBounds(allBranches).getCenter();
        map.setView(center);
      }
    }, [shopsWithBranches, map]);

    return null;
  };

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
        center={currentPosition || [55.751244, 37.618423]}
        zoom={7}
        scrollWheelZoom
        className={styles.map}
      >
        <TileLayer
          attribution={mapThemes[theme].attribution}
          url={mapThemes[theme].url}
        />

        <Recenter position={currentPosition} />
        <CenterToShops shopsWithBranches={shopsWithBranches} />
        <MapControls
          initialPosition={initialPosition}
          currentPosition={currentPosition}
          setCurrentPosition={setCurrentPosition}
          theme={theme}
          setTheme={setTheme}
        />

        {radius && (
          <Circle
            center={currentPosition}
            radius={radius * 1000}
            pathOptions={{
              color: "gray",
              fillColor: "lightgray",
              fillOpacity: 0.2,
            }}
          />
        )}

        {currentPosition && (
          <Marker position={currentPosition} icon={homeIcon}>
            <Tooltip permanent direction="bottom" offset={[0, 5]}>
              You
            </Tooltip>
            <Popup>Your location</Popup>
          </Marker>
        )}

        {shopsWithBranches.flatMap((shop) =>
          shop.branches.map((branch, idx) => (
            <Marker
              key={`${shop.id}-${idx}`}
              position={[branch.latitude, branch.longitude]}
              icon={locationIcon}
              eventHandlers={{
                click: async () => {
                  console.log(shop.id);

                  await getShopItemsRequest(
                    shop.id,
                    searchFilter,
                    radius,
                    currentPosition
                  );
                },
              }}
            >
              <Popup>
                <b>{shop.title}</b>
                <br />
                {branch.address}
                <br />
                💰 {shop.minPrice}€ – {shop.maxPrice}€
                <br />
                <small>Median: {shop.medianPrice}€</small>
              </Popup>
            </Marker>
          ))
        )}
      </MapContainer>
    </div>
  );
}
