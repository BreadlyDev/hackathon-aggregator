import Map from "./components/Map/Map";
import SearchPanel from "./components/SearchPanel/SearchPanel";
import ItemsInfo from "./components/ItemsInfo/ItemsInfo";

import "./App.scss";
import { useState } from "react";

function App() {
  const [radius, setRadius] = useState(10);
  const [currentPosition, setCurrentPosition] = useState([50.718, 12.4885]);
  const [shopsWithBranches, setShopsWithBranches] = useState([]);
  const [searchFilter, setSearchFilter] = useState({
    title: "",
    minPrice: "",
    maxPrice: "",
    size: "",
    color: "",
    gender: "",
    shop: "",
  });

  return (
    <>
      <SearchPanel
        radius={radius}
        setRadius={setRadius}
        userPosition={currentPosition}
        setShopsWithBranches={setShopsWithBranches}
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
      />
      <Map
        radius={radius}
        currentPosition={currentPosition}
        setCurrentPosition={setCurrentPosition}
        shopsWithBranches={shopsWithBranches}
        searchFilter={searchFilter}
      />
      <ItemsInfo />
    </>
  );
}

export default App;
