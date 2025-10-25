import { useEffect, useState } from "react";
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

import "leaflet/dist/leaflet.css";
import styles from "./Map.module.scss";

import { getShopItemsRequest } from "../../api/api";
import {
  userIcon,
  cheapLocationIcon,
  mediumLocationIcon,
  expensiveLocationIcon,
} from "./icons.jsx";
import Recenter from "./Recenter";
import MapControls from "./MapControls";
import { mapThemes } from "./themes.js";

export default function Map({
  radius,
  currentPosition,
  setCurrentPosition,
  shopsWithBranches,
  searchFilter,
  setShopWithItems,
}) {
  const [initialPosition, setInitialPosition] = useState(null);
  const [theme, setTheme] = useState("light");

  const allMedians = shopsWithBranches.map((shop) => shop.medianPrice);
  const globalMin = Math.min(...allMedians);
  const globalMax = Math.max(...allMedians);
  const range = globalMax - globalMin;

  function getPriceCategory(median) {
    const ratio = (median - globalMin) / range;
    if (ratio < 0.33) return "cheap";
    if (ratio < 0.66) return "medium";
    return "expensive";
  }

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
          <Marker position={currentPosition} icon={userIcon}>
            <Tooltip permanent direction="bottom" offset={[0, 5]}>
              You
            </Tooltip>
            <Popup>Your location</Popup>
          </Marker>
        )}

        {shopsWithBranches.flatMap((shop) =>
          shop.branches.map((branch, idx) => {
            const category = getPriceCategory(shop.medianPrice);

            let icon;
            if (category === "cheap") icon = cheapLocationIcon;
            else if (category === "medium") icon = mediumLocationIcon;
            else icon = expensiveLocationIcon;

            return (
              <Marker
                key={`${shop.id}-${idx}`}
                position={[branch.latitude, branch.longitude]}
                icon={icon}
                eventHandlers={{
                  click: async () => {
                    const data = await getShopItemsRequest(
                      shop.id,
                      searchFilter,
                      radius,
                      currentPosition
                    );
                    setShopWithItems(data);
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
            );
          })
        )}
      </MapContainer>
    </div>
  );
}
