import { FieldError } from "react-hook-form";
import { Alert } from "@mui/material";
import React from "react";

interface ErrorAlertProps {
  error: FieldError | undefined;
}

const ValidationErrorAlert = ({ error }: ErrorAlertProps) => {
  return (
    (error && (
      <Alert severity="error">
        {error.message}
      </Alert>
    )) || <></>
  );
};

export default ValidationErrorAlert;
