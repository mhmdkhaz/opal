import { Box, Grid } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Shared/Navbar/Navbar";
import Footer from "./Shared/Footer/Footer";

function UserComponent() {
  return (
    <>
      <Box>
        <Box>
          <Navbar />
        </Box>

        <Box>
          <Outlet />
        </Box>

        <Box>
          <Footer />
        </Box>
      </Box>
    </>
  );
}

export default UserComponent;
