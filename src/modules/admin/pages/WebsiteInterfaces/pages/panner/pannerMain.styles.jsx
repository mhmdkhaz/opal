// pannerMain.styles.jsx
import { styled } from "@mui/material/styles";
import { Box, Card } from "@mui/material";

export const ContainerBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: "#fff",
  borderRadius: theme.spacing(1),
  direction: "rtl",
  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
}));

export const ImageCard = styled(Card)(({ theme }) => ({
  position: "relative",
  borderRadius: theme.spacing(1),
}));

export const AddImageCard = styled(Card)(({ theme }) => ({
  height: 140,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  border: "2px dashed #aaa",
  borderRadius: theme.spacing(1),
  cursor: "pointer",
}));

export const DeleteButtonStyle = {
  position: "absolute",
  top: 4,
  left: 4,
  backgroundColor: "rgba(255,255,255,0.8)",
};
