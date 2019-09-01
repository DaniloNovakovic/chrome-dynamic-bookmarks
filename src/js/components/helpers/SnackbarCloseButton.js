import React from "react";
import IconButton from "@material-ui/core/IconButton";
import IconClose from "@material-ui/icons/Close";
import { useSnackbar } from "notistack";

function SnackbarCloseButton({ key }) {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton onClick={() => closeSnackbar(key)}>
      <IconClose />
    </IconButton>
  );
}

export default SnackbarCloseButton;
