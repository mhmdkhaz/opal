import React from "react";
import { Route, Routes } from "react-router-dom";
import ShopComponent from "./ShopComponent";
import ShopIndex from "./pages/ShopIndex";

const ShopRouting = () => {
  return (
    <Routes>
      <Route element={<ShopComponent />}>
        <Route path="/" element={<ShopIndex />} />
      </Route>

      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
};

export default ShopRouting;
