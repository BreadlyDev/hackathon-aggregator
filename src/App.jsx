import Map from "./components/Map/Map";
import SearchPanel from "./components/SearchPanel/SearchPanel";
import ItemsInfo from "./components/ItemsInfo/ItemsInfo";

import "./App.scss";
import { useState } from "react";

function App() {
  const [radius, setRadius] = useState(10);
  const [currentPosition, setCurrentPosition] = useState([50.718, 12.4885]);
  const [shopsWithBranches, setShopsWithBranches] = useState([]);

  return (
    <>
      <SearchPanel
        radius={radius}
        setRadius={setRadius}
        userPosition={currentPosition}
        setShopsWithBranches={setShopsWithBranches}
      />
      <Map
        radius={radius}
        currentPosition={currentPosition}
        setCurrentPosition={setCurrentPosition}
        shopsWithBranches={shopsWithBranches}
      />
      <ItemsInfo />
    </>
  );
}

export default App;
