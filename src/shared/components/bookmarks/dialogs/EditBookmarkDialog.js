import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import { BookmarkForm } from "../form";
import { sendMessage } from "shared/lib/browser";
import { responseTypes, requestTypes } from "shared/constants";
import { makeUniqueNodeByIdSelector } from "shared/store";

export function EditBookmarkDialog(props) {
  const { onClose, open, node = {} } = props;

  function handleClose() {
    onClose();
  }

  function handleSubmit(values, done) {
    console.log("submitting...");
    sendMessage(
      requestTypes.EDIT_BM_NODE,
      { id: node.id, ...values },
      response => {
        console.log("response", response);
        done(response);
        if (response.type === responseTypes.SUCCESS) {
          handleClose();
        }
      }
    );
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
  nodeId: PropTypes.string
};

function makeMapState() {
  const nodeByIdSelector = makeUniqueNodeByIdSelector();
  return (state, ownProps) => {
    const node = nodeByIdSelector(state, ownProps.nodeId);
    return { node };
  };
}

export default connect(makeMapState)(EditBookmarkDialog);
