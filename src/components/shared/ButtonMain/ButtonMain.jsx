import { Button } from "@mui/material";
import React from "react";

function ButtonMain({ sx = {}, onClick, children }) {
  return (
    <Button
      onClick={onClick}
      sx={{
        backgroundColor: "#8A1A9B",
        color: "#fff",
        px: 2,
        py: 1.5,
        ...sx,
      }}
    >
      {children}
    </Button>
  );
}

export default ButtonMain;
