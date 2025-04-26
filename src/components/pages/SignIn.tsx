import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ForgotPassword from "../molecules/ForgotPassword";
import ColorModeSelect from "../../theme/ColorModeSelect";
import { FridgePalIconWide } from "../../assets/icons/CustomIcons";
import { LoginRequest } from "../../types/LoginRequest";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { isLoggedIn } from "../../hooks/useAuth";
import { useAppDispatch } from "../../store";
import { loginUser } from "../../store/userStore";
import toast from "react-hot-toast";
import SignInContainer from "../atoms/SignInContainer";
import StyledCard from "../atoms/StyledCard";
import { Controller, useForm } from "react-hook-form";
import loginRequestValidationSchema from "../../validation/loginRequestValidationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import ValidationErrorAlert from "../atoms/ValidationErrorAlert";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const defaultLoginValues: LoginRequest = {
    username: "",
    password: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    defaultValues: defaultLoginValues,
    resolver: yupResolver(loginRequestValidationSchema),
  });

  if (isLoggedIn()) {
    return <Navigate to="/home" />;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLoginSubmit = async (loginRequest: LoginRequest) => {
    dispatch(loginUser(loginRequest))
      .unwrap()
      .then(() => navigate("/home"))
      .catch((e) => toast.error(e));
  };

  return (
    <>
      <SignInContainer direction="column" justifyContent="space-between">
        <ColorModeSelect
          sx={{ position: "fixed", top: "1rem", right: "1rem" }}
        />
        <StyledCard variant="outlined">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              textAlign: "center",
              gap: "2rem",
            }}
          >
            <FridgePalIconWide />
            <Typography
              component="h1"
              variant="h4"
              sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
            >
              Sign in
            </Typography>
          </Box>
          <Box
            component="form"
            onSubmit={handleSubmit(handleLoginSubmit)}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              gap: 2,
            }}
          >
            <Controller
              name="username"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormControl>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <TextField
                    type="text"
                    placeholder="Your Username"
                    fullWidth
                    variant="outlined"
                    {...field}
                  />
                </FormControl>
              )}
            />
            <ValidationErrorAlert error={errors.username} />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <FormControl>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <TextField
                    placeholder="••••••"
                    type="password"
                    autoComplete="current-password"
                    autoFocus
                    fullWidth
                    variant="outlined"
                    {...field}
                  />
                </FormControl>
              )}
            />
            <ValidationErrorAlert error={errors.password} />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <ForgotPassword open={open} handleClose={handleClose} />
            <Button type="submit" fullWidth variant="contained">
              Sign in
            </Button>
            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: "center" }}
            >
              Forgot your password?
            </Link>
          </Box>
        </StyledCard>
      </SignInContainer>
    </>
  );
}
