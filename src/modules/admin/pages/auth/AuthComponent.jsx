import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

function AuthComponent() {
  return (
    <>
      <Box>
        <Outlet />
      </Box>
    </>
  );
}

export default AuthComponent;
