import React from "react";
import { Outlet } from "react-router-dom";

function HomeComponent() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default HomeComponent;
