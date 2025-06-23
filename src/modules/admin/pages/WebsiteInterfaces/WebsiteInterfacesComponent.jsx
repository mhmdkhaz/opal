import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

function WebsiteInterfacesComponent() {
  return (
    <>
      <Box>
        <Outlet />
      </Box>
    </>
  );
}

export default WebsiteInterfacesComponent;
