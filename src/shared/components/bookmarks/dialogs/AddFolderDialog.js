import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import { FolderForm } from "../form";
import { sendMessage } from "shared/lib/browser";
import { responseTypes, requestTypes } from "shared/constants";
import { filterSelector } from "shared/store";

export function AddFolderDialog(props) {
  const { onClose, open, parentId } = props;

  function handleClose() {
    onClose();
  }

  function handleSubmit(values, done) {
    sendMessage(requestTypes.ADD_BM_NODE, { ...values, parentId }, response => {
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
  open: PropTypes.bool.isRequired,
  parentId: PropTypes.string
};

function mapStateToProps(state) {
  const filter = filterSelector(state) || {};
  return {
    parentId: filter.parentId
  };
}

export default connect(mapStateToProps)(AddFolderDialog);
