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

export function FolderActionMenu(props) {
  const { openDialog } = React.useContext(DialogContext);
  const {
    nodeId,
    readOnly,
    open,
    onClose,
    onRemove,
    onCopy,
    onCut,
    clipboard,
    ...other
  } = props;

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
      id={`folder-action-menu`}
      keepMounted
      open={open}
      onClose={handleClose}
      {...other}
    >
      <MenuItem
        dense
        disabled={readOnly}
        onClick={() =>
          handleDialogOpen(dialogIds.editFolderDialogId, { nodeId })
        }
      >
        Rename
      </MenuItem>
      <MenuItem dense disabled={readOnly} onClick={handleRemove}>
        Delete
      </MenuItem>
      <Divider />
      <MenuItem dense disabled={readOnly} onClick={handleCut}>
        Cut
      </MenuItem>
      <MenuItem dense onClick={handleCopy}>
        Copy
      </MenuItem>
      <MenuItem dense disabled={!clipboard.type} onClick={handleClose}>
        Paste
      </MenuItem>
      <Divider />
      <MenuItem dense onClick={handleClose}>
        Open all bookmarks
      </MenuItem>
      <MenuItem dense onClick={handleClose}>
        Open all in new window
      </MenuItem>
      <MenuItem dense onClick={handleClose}>
        Open all in incognito window
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
)(FolderActionMenu);
