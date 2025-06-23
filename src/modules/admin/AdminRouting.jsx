import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminComponent from "./AdminComponent";
import {
  AuthRouting,
  MainPageRouting,
  DetailsRouting,
  WebsiteInterfacesRouting,
  IndexesRouting,
  ProductRouting,
} from "../../routes/route";
import ShouldBeLogged from "../../middleware/ShouldBeLogged";

function AdminRouting() {
  return (
    <Routes>
      <Route path="/" element={<AuthRouting />} />
      <Route element={<AdminComponent />}>
        <Route element={<ShouldBeLogged />}>
          <Route path="/main" element={<MainPageRouting />} />

          <Route path="/detailsOrder/*" element={<DetailsRouting />} />

          <Route path="/interface/*" element={<WebsiteInterfacesRouting />} />

          <Route path="/indexes/*" element={<IndexesRouting />} />

          <Route path="/product/*" element={<ProductRouting />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AdminRouting;
