import React from "react";
import Logo from "../../../../../assets/opal-logo.svg";
import {
  Typography,
  TextField,
  Button,
  CssBaseline,
  FormHelperText,
  Box,
} from "@mui/material";
import { LoginContainer, LoginCard, styles } from "./Login.styles";
import { useLogin } from "../../../../../services/auth/auth";

function Login() {
  const { register, handleSubmit, onSubmit, errors, isPending } = useLogin();

  return (
    <LoginContainer>
      <CssBaseline />
      <LoginCard>
        <Box component="figure">
          <Box component="img" src={Logo} sx={styles.LogoDev} />
        </Box>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register("email")}
            error={Boolean(errors.email)}
            autoComplete="email"
          />
          {errors.email && (
            <FormHelperText sx={styles.errorText}>
              {errors.email.message}
            </FormHelperText>
          )}

          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            sx={styles.passwordField}
            {...register("password")}
            error={Boolean(errors.password)}
            autoComplete="current-password"
          />
          {errors.password && (
            <FormHelperText sx={styles.errorText}>
              {errors.password.message}
            </FormHelperText>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={styles.loginButton}
            disabled={isPending}
          >
            {isPending ? "Logging in..." : "LOG IN"}
          </Button>
        </form>
      </LoginCard>
    </LoginContainer>
  );
}

export default Login;
