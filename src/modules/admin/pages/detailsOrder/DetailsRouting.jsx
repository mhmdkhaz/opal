import React from "react";
import { Route, Routes } from "react-router-dom";
import DetailsComponent from "./DetailsComponent";
import DetailsOrder from "./pages/DetailsOrder/DetailsOrder";

function DetailsRouting() {
  return (
    <Routes>
      <Route element={<DetailsComponent />}>
        <Route path=":id" element={<DetailsOrder />} />
      </Route>
    </Routes>
  );
}

export default DetailsRouting;
