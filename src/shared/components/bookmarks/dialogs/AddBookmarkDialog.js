import React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import { BookmarkForm } from "../form";
import { sendMessage } from "shared/lib/browser";
import { responseTypes, requestTypes } from "shared/constants";

export default function AddBookmarkDialog(props) {
  const { onClose, open } = props;

  function handleClose() {
    onClose();
  }

  function handleSubmit(values, done) {
    sendMessage(requestTypes.ADD_BM_NODE, values, response => {
      done(response);
      if (response.type === responseTypes.SUCCESS) {
        handleClose();
      }
    });
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="add-bookmark-dialog-title"
      open={open}
      fullWidth={true}
    >
      <DialogTitle id="add-bookmark-dialog-title">Add bookmark</DialogTitle>
      <DialogContent dividers>
        <BookmarkForm handleSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
}

AddBookmarkDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};
