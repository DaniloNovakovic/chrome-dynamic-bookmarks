import React from "react";
import { connect } from "react-redux";
import { Menu, MenuItem, Divider } from "@material-ui/core";
import {
  removeBookmarkNode,
  copyToClipboard,
  cutToClipboard,
  pasteToBookmarkNode,
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
    onPaste,
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

  function handlePaste() {
    onPaste({
      type: clipboard.type,
      from: clipboard.data,
      to: { parentId: nodeId }
    });
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
      <MenuItem dense disabled={!clipboard.type} onClick={handlePaste}>
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
    onCut: cutToClipboard,
    onPaste: pasteToBookmarkNode
  }
)(FolderActionMenu);
