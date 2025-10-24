import Map from "./components/Map/Map";
import SearchPanel from "./components/SearchPanel/SearchPanel";
import ItemsInfo from "./components/ItemsInfo/ItemsInfo";

import "./App.scss";
import { useState } from "react";

function App() {
  const [radius, setRadius] = useState(10);

  return (
    <>
      <SearchPanel radius={radius} setRadius={setRadius} />
      <Map radius={radius} />
      <ItemsInfo />
    </>
  );
}

export default App;
