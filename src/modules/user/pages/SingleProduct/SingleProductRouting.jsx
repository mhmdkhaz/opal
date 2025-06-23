import React from "react";
import { Route, Routes } from "react-router-dom";
import SingleProductComponent from "./SingleProductComponent";
import SingleProductIndex from "./pages/SingleProductIndex";

function SingleProductRouting() {
  return (
    <Routes>
      <Route element={<SingleProductComponent />}>
        <Route path="/" element={<SingleProductIndex />} />
      </Route>

      <Route path="*" element={<p>not found 404</p>} />
    </Routes>
  );
}

export default SingleProductRouting;
