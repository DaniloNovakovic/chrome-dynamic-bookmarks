import { TextField, TextFieldProps } from "@mui/material";
import { FieldProps, getIn } from "formik";
import React from "react";

type FormikTextFieldProps = FieldProps & TextFieldProps;

export default function FormikTextField({
  field,
  form,
  helperText,
  ...props
}: FormikTextFieldProps) {
  const touched = getIn(form.touched, field.name);
  const error = getIn(form.errors, field.name);
  const hasError = Boolean(touched && error);

  return (
    <TextField
      {...field}
      {...props}
      error={hasError}
      helperText={hasError ? error : helperText}
    />
  );
}
