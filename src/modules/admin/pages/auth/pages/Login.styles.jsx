import { Box, Paper } from "@mui/material";

export const LoginContainer = ({ children }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
    }}
  >
    {children}
  </Box>
);

export const LoginCard = ({ children }) => (
  <Paper
    elevation={3}
    sx={{
      p: 4,
      width: 450,
      textAlign: "center",
    }}
  >
    {children}
  </Paper>
);

export const styles = {
  LogoDev: {
    width: 250,
    my: 2,
  },
  title: {
    fontWeight: "bold",
    mb: 2,
  },
  subtitle: {
    fontWeight: "bold",
    mb: 4,
  },
  passwordField: {
    mt: 2,
  },
  loginButton: {
    mt: 4,
    py: 1.5,
    fontWeight: "bold",
    backgroundColor: "#8A1A9B",
  },
};
