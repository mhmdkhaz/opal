import { styled } from "@mui/material/styles";
import { Box, Slide, TableCell, Button } from "@mui/material";
import React from "react";

export const ColorSwatch = styled("div")(({ color }) => ({
  width: 32,
  height: 32,
  borderRadius: "8px",
  backgroundColor: color,
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease",
  cursor: "pointer",
  "&:hover": {
    transform: "scale(1.1)",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
  },
}));

export const GradientHeader = styled(TableCell)(({ theme }) => ({
  background: "#8A1A9B",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "1.1rem",
  padding: "12px 16px",
}));

export const ButtonMain = styled(Button)(({}) => ({
  background: "#8A1A9B",
}));

export const ColorPreview = styled(Box)({
  width: "100%",
  height: 60,
  borderRadius: 12,
  marginBottom: 16,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontWeight: "bold",
  fontSize: "1.2rem",
  textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
  transition: "all 0.3s ease",
});

export const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
