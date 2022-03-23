import React from "react";
import ReactDOM from "react-dom";
import SakuraProvider from "./providers/SakuraProvider";

import "./css/styles.css";

import App from "./App";
import { MapContextProvider } from "./context/MapContext";

ReactDOM.render(
  <SakuraProvider>
    <MapContextProvider>
      <App />
    </MapContextProvider>
  </SakuraProvider>,
  document.getElementById("root")
);
