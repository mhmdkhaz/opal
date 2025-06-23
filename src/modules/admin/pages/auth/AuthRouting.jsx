import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthComponent from "./AuthComponent";
import Login from "./pages/Login";

function UserRouting() {
  return (
    <Routes>
      <Route element={<AuthComponent />}>
        <Route path="/" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default UserRouting;
