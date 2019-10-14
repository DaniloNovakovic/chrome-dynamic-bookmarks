import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  Container,
  DialogContent
} from "@material-ui/core";
import { FolderForm } from "../form";
import { sendMessage } from "shared/lib/browser";
import { ADD_BM_NODE } from "shared/constants/requestTypes";
import { responseTypes } from "shared/constants";

export default function AddFolderDialog(props) {
  const { onClose, open } = props;

  function handleClose() {
    onClose();
  }

  function handleSubmit(values, done) {
    sendMessage(ADD_BM_NODE, values, response => {
      done(response);
      if (response.type === responseTypes.SUCCESS) {
        handleClose();
      }
    });
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="add-folder-dialog-title"
      open={open}
      fullWidth={true}
    >
      <DialogTitle id="add-folder-dialog-title">Add folder</DialogTitle>
      <DialogContent dividers>
        <FolderForm handleSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}

AddFolderDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};
