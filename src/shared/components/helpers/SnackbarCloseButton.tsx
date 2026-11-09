import IconClose from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useSnackbar } from "notistack";
import React from "react";

function SnackbarCloseButton({ id }) {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton onClick={() => closeSnackbar(id)}>
      <IconClose />
    </IconButton>
  );
}

export default SnackbarCloseButton;
