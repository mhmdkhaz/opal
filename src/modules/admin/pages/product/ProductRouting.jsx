import React from "react";
import { Route, Routes } from "react-router-dom";
import ProductComponent from "./ProductComponent";
import ShowProduct from "./page/showProduct/ShowProduct";
import ProductFormPage from "./page/productForm/productForm";

function ProductRouting() {
  return (
    <Routes>
      <Route element={<ProductComponent />}>
        <Route path="/" element={<ShowProduct />} />
        <Route path="/add" element={<ProductFormPage />} />
      </Route>
    </Routes>
  );
}

export default ProductRouting;
