import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import { connect } from "react-redux";

import { addBookmarkNode, filterSelector } from "@/shared/store";

import { FolderForm } from "../form";

function AddFolderDialog(props) {
  const { onClose, open, parentId, onSubmit } = props;

  function handleClose() {
    onClose();
  }

  function handleSubmit(values) {
    onSubmit(parentId ? { ...values, parentId } : values);
    handleClose();
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

function mapStateToProps(state) {
  const filter = filterSelector(state) || {};
  return {
    parentId: filter.parentId,
  };
}

export default connect(mapStateToProps, { onSubmit: addBookmarkNode })(
  AddFolderDialog,
);
