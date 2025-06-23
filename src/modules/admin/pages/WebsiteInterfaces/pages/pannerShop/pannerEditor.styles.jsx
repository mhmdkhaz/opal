// pannerEditor.styles.jsx
import { styled } from "@mui/material/styles";
import { Card, Button, Paper } from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: "16px",
  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
  overflow: "visible",
  position: "relative",
  marginBottom: theme.spacing(3),
}));

export const BannerPreview = styled(Paper)(({ theme }) => ({
  height: "300px",
  width: "100%",
  borderRadius: "12px",
  background: "linear-gradient(45deg, #f5f7fa 0%, #c3cfe2 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  position: "relative",
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: theme.shadows[6],
  },
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: "12px",
  padding: "8px 16px",
  textTransform: "none",
  fontWeight: "bold",
  transition: "all 0.2s ease",
  "&:hover": {
    transform: "translateY(-2px)",
  },
}));
