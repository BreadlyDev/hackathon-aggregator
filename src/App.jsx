import Map from "./components/Map/Map";
import SearchPanel from "./components/SearchPanel/SearchPanel";
import ItemsInfo from "./components/ItemsInfo/ItemsInfo";

import "./App.scss";
import { useState } from "react";

function App() {
  const [radius, setRadius] = useState(10);
  const [currentPosition, setCurrentPosition] = useState([
    55.751244, 37.618423,
  ]);

  return (
    <>
      <SearchPanel
        radius={radius}
        setRadius={setRadius}
        userPosition={currentPosition}
      />
      <Map
        radius={radius}
        currentPosition={currentPosition}
        setCurrentPosition={setCurrentPosition}
      />
      <ItemsInfo />
    </>
  );
}

export default App;
