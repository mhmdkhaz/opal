// OrderDetails.styles.jsx
import { styled } from "@mui/material/styles";
import { Box, IconButton, Card } from "@mui/material";

// الحاوية الأساسية للصفحة
export const Container = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  minHeight: "100vh",
  direction: "rtl",
}));

// الزر الخلفي
export const BackButton = styled(IconButton)(({ theme }) => ({
  transform: "rotate(180deg)",
}));

// بطاقة الطلب
export const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  background: "linear-gradient(135deg, #ffffff, #f9f9fb)",
}));

// دائرة اللون
export const ColorCircle = styled(Box)(({ theme, bgcolor }) => ({
  width: 18,
  height: 18,
  borderRadius: "50%",
  backgroundColor: bgcolor,
  border: "1px solid #ccc",
  margin: "auto",
}));
