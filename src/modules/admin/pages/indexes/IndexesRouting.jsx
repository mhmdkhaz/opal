import React from "react";
import { Route, Routes } from "react-router-dom";
import IndexesComponent from "./IndexesComponent";
import Color from "./pages/color/Color";
import Categories from "./pages/categories/Categorie";
import Sizes from "./pages/sizes/Sizes";

function IndexesRouting() {
  return (
    <Routes>
      <Route element={<IndexesComponent />}>
        <Route path="/" element={<Color />} />
        <Route path="/categorie" element={<Categories />} />
        <Route path="/sizess" element={<Sizes />} />
      </Route>
    </Routes>
  );
}

export default IndexesRouting;
