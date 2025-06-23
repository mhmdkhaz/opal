import { styled } from "@mui/material/styles";
import { Box, Paper, Typography } from "@mui/material";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(3),
  direction: "rtl",
}));

export const FormTitle = styled(Typography)({
  marginBottom: 16,
  textAlign: "right",
  fontWeight: 600,
});

export const FilterFormContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row-reverse",
  gap: theme.spacing(2),
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "center",
}));
