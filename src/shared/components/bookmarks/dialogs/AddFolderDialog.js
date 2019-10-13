import React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogTitle } from "@material-ui/core";

export default function AddFolderDialog(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="add-folder-dialog-title"
      open={open}
    >
      <DialogTitle id="add-folder-dialog-title">Add folder</DialogTitle>
    </Dialog>
  );
}

AddFolderDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};
