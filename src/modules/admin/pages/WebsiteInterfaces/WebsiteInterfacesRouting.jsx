import React from "react";
import { Route, Routes } from "react-router-dom";
import WebsiteInterfacesComponent from "./WebsiteInterfacesComponent";
import PannerMain from "./pages/panner/PannerMain";
import PannerShop from "./pages/pannerShop/pannerShop";

function WebsiteInterfacesRouting() {
  return (
    <Routes>
      <Route element={<WebsiteInterfacesComponent />}>
        <Route path="/" element={<PannerMain />} />
        <Route path="/shop" element={<PannerShop />} />
      </Route>
    </Routes>
  );
}

export default WebsiteInterfacesRouting;
