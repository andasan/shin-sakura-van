import React from "react";

import "leaflet/dist/leaflet.css";
import "react-input-range/lib/css/index.css";

import SakuraMap from "./pages/map/SakuraMap";
import VerticalSlider from "./components/layout/verticalslider/VerticalSlider";

const App = () => {
  return (
    <div>
      <SakuraMap />
      <div className="controlContainer">
        <VerticalSlider />
      </div>
    </div>
  );
};
export default App;
