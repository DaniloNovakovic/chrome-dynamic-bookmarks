import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import { BookmarkForm } from "../form";
import { filterSelector, addBookmarkNode } from "shared/store";

function AddBookmarkDialog(props) {
  const { onClose, open, parentId, onSubmit } = props;

  function handleClose() {
    onClose();
  }

  function handleSubmit(values) {
    onSubmit({ ...values, parentId });
    handleClose();
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
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const filter = filterSelector(state) || {};
  return {
    parentId: filter.parentId
  };
}

export default connect(
  mapStateToProps,
  { onSubmit: addBookmarkNode }
)(AddBookmarkDialog);
