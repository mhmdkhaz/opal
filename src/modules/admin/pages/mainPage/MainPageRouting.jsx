import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPageComponent from "./MainPageComponent";
import MainPageIndex from "./pages/MainPageIndex";

function MainPageRouting() {
  return (
    <Routes>
      <Route element={<MainPageComponent />}>
        <Route path="/" element={<MainPageIndex />} />
      </Route>
    </Routes>
  );
}

export default MainPageRouting;
