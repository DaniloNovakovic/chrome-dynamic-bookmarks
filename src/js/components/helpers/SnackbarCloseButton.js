import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { Close as IconClose } from "@material-ui/icons";
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
