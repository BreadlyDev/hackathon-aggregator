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

const locationIconMarkup = renderToStaticMarkup(
  <LocationOnIcon style={{ color: "#e63946", fontSize: "28px" }} />
);

const locationIcon = new L.DivIcon({
  html: locationIconMarkup,
  className: "",
  iconSize: [28, 28],
  iconAnchor: [14, 28],
});

export { userIcon, locationIcon };
