import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import L from "leaflet";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const userIconMarkup = renderToStaticMarkup(
  <PersonIcon style={{ color: "#ff6699", fontSize: "28px" }} />
);

const userIcon = new L.DivIcon({
  html: userIconMarkup,
  className: "",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

function createLocationIcon(color) {
  const markup = renderToStaticMarkup(
    <LocationOnIcon style={{ color, fontSize: "28px" }} />
  );

  return new L.DivIcon({
    html: markup,
    className: "",
    iconSize: [28, 28],
    iconAnchor: [14, 28],
  });
}

export { userIcon };
export const cheapLocationIcon = createLocationIcon("#67e639");
export const mediumLocationIcon = createLocationIcon("#e6e339");
export const expensiveLocationIcon = createLocationIcon("#e63946");
