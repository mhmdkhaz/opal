import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./shared/sidebar/Sidebar"; // Import your sidebar component

function AdminComponent() {
  return (
    <Box sx={{ display: "flex", direction: "rtl" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          //   width: `calc(100% - ${drawerWidth}px)`,
          //   marginRight: `${drawerWidth}px`,
          //   backgroundColor: (theme) => theme.palette.background.default,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default AdminComponent;
