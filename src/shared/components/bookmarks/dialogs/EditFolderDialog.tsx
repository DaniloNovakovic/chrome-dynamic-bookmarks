import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import React from "react";
import { connect } from "react-redux";

import { editBookmarkNode, makeUniqueNodeByIdSelector } from "@/shared/store";

import { FolderForm } from "../form";

export function EditFolderDialog(props) {
  const { onClose, open, node = {}, onSubmit } = props;

  function handleClose() {
    onClose();
  }

  function handleSubmit(values) {
    onSubmit({ id: node.id, ...values });
    handleClose();
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="edit-folder-dialog-title"
      open={open}
      fullWidth={true}
    >
      <DialogTitle id="edit-folder-dialog-title">Edit folder</DialogTitle>
      <DialogContent dividers>
        <FolderForm handleSubmit={handleSubmit} initialValues={node} />
      </DialogContent>
    </Dialog>
  );
}

function makeMapState() {
  const nodeByIdSelector = makeUniqueNodeByIdSelector();
  return (state, ownProps) => {
    const node = nodeByIdSelector(state, ownProps.nodeId);
    return { node };
  };
}

export default connect(makeMapState, { onSubmit: editBookmarkNode })(
  EditFolderDialog
);
