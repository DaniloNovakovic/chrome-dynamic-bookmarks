import React from "react";
import { connect } from "react-redux";
import { Menu, MenuItem, Divider } from "@material-ui/core";
import {
  removeBookmarkNode,
  copyToClipboard,
  cutToClipboard,
  clipboardSelector
} from "shared/store";
import { DialogContext } from "shared/components/bookmarks";
import { dialogIds } from "shared/constants";

export function FileActionMenu(props) {
  const {
    nodeId,
    clipboard,
    open,
    onClose,
    onRemove,
    onCopy,
    onCut,
    ...other
  } = props;
  const { openDialog } = React.useContext(DialogContext);

  function handleClose() {
    onClose();
  }

  function handleRemove() {
    onRemove(nodeId);
    handleClose();
  }

  function handleCopy() {
    onCopy({ nodeId });
    handleClose();
  }
  function handleCut() {
    onCut({ nodeId });
    handleClose();
  }

  function handleDialogOpen(dialogId, args = {}) {
    openDialog(dialogId, args);
    handleClose();
  }

  return (
    <Menu
      id={`bookmark-action-menu`}
      keepMounted
      open={open}
      onClose={handleClose}
      {...other}
    >
      <MenuItem
        dense
        onClick={() =>
          handleDialogOpen(dialogIds.editBookmarkDialogId, { nodeId })
        }
      >
        Edit
      </MenuItem>
      <MenuItem onClick={handleRemove} dense>
        Delete
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleCut} dense>
        Cut
      </MenuItem>
      <MenuItem onClick={handleCopy} dense>
        Copy
      </MenuItem>
      <MenuItem onClick={handleClose} dense>
        Copy URL
      </MenuItem>
      <MenuItem onClick={handleClose} dense disabled={!clipboard.type}>
        Paste
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleClose} dense>
        Open in new tab
      </MenuItem>
      <MenuItem onClick={handleClose} dense>
        Open in new window
      </MenuItem>
      <MenuItem onClick={handleClose} dense>
        Open in new incognito window
      </MenuItem>
    </Menu>
  );
}

function mapStateToProps(state) {
  return {
    clipboard: clipboardSelector(state)
  };
}

export default connect(
  mapStateToProps,
  {
    onRemove: removeBookmarkNode,
    onCopy: copyToClipboard,
    onCut: cutToClipboard
  }
)(FileActionMenu);
