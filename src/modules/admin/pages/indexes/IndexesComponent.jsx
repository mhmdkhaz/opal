import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

function IndexesComponent() {
  return (
    <>
      <Box>
        <Outlet />
      </Box>
    </>
  );
}

export default IndexesComponent;
