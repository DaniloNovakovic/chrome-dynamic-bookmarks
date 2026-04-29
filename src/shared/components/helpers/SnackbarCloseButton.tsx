import IconButton from "@material-ui/core/IconButton";
import IconClose from "@material-ui/icons/Close";
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
