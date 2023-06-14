import React, { lazy, Suspense } from "react";

import "leaflet/dist/leaflet.css";
import "react-input-range/lib/css/index.css";

import Preloader from "@/components/modules/preloader/Preloader";

const SakuraMap = lazy(() => import("@/pages/map/SakuraMap"))
const VerticalSlider = lazy(() => import("@/components/layout/verticalslider/VerticalSlider"))

const App = () => {
  return (
    <Suspense fallback={<Preloader />}>
      <SakuraMap />
      <div className="controlContainer">
        <VerticalSlider />
      </div>
    </Suspense>
  );
};
export default App;
