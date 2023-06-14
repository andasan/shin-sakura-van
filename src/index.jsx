import React from "react";
import ReactDOM from "react-dom/client";
import SakuraProvider from "@/providers/SakuraProvider";

import "./css/styles.css";

import App from "./App";
import { MapContextProvider } from "@/context/MapContext";

ReactDOM.createRoot(document.getElementById("root")).render(
<SakuraProvider>
    <MapContextProvider>
      <App />
    </MapContextProvider>
  </SakuraProvider>
)
