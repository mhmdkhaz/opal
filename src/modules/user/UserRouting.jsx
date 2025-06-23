import React from "react";
import { Route, Routes } from "react-router-dom";
import UserComponent from "./UserComponent";
import {
  HomeUserRouting,
  ShopUserRouting,
  SingleProductUserRouting,
} from "../../routes/route";
import ShouldNotBeLogged from "../../middleware/ShouldNotBeLogged";

function UserRouting() {
  return (
    <Routes>
      <Route element={<UserComponent />}>
        <Route path="/" element={<HomeUserRouting />} />
        {/* <Route element={<ShouldNotBeLogged />}> */}
        <Route path="/shop" element={<ShopUserRouting />} />
        <Route path="/product" element={<SingleProductUserRouting />} />
        {/* </Route> */}
      </Route>
    </Routes>
  );
}

export default UserRouting;
