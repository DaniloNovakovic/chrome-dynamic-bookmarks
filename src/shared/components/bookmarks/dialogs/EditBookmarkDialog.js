import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import { BookmarkForm } from "../form";
import { makeUniqueNodeByIdSelector, editBookmarkNode } from "shared/store";

export function EditBookmarkDialog(props) {
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
      aria-labelledby="edit-bookmark-dialog-title"
      open={open}
      fullWidth={true}
    >
      <DialogTitle id="edit-bookmark-dialog-title">Edit bookmark</DialogTitle>
      <DialogContent dividers>
        <BookmarkForm handleSubmit={handleSubmit} initialValues={node} />
      </DialogContent>
    </Dialog>
  );
}

EditBookmarkDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
};

function makeMapState() {
  const nodeByIdSelector = makeUniqueNodeByIdSelector();
  return (state, ownProps) => {
    const node = nodeByIdSelector(state, ownProps.nodeId);
    return { node };
  };
}

export default connect(
  makeMapState,
  { onSubmit: editBookmarkNode }
)(EditBookmarkDialog);
