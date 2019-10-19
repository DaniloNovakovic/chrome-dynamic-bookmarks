import React from "react";
import { connect } from "react-redux";
import { Menu, MenuItem, Divider } from "@material-ui/core";
import { removeBookmarkNode } from "shared/store";
import { DialogContext } from "shared/components/bookmarks";
import { dialogIds } from "shared/constants";

export function FolderActionMenu(props) {
  const { nodeId, open, onClose, onRemove, readOnly, ...other } = props;
  const { openDialog } = React.useContext(DialogContext);

  function handleClose() {
    onClose();
  }

  function handleRemove() {
    onRemove(nodeId);
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
      <MenuItem dense disabled={readOnly} onClick={handleClose}>
        Cut
      </MenuItem>
      <MenuItem dense onClick={handleClose}>
        Copy
      </MenuItem>
      <MenuItem dense onClick={handleClose}>
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

export default connect(
  null,
  { onRemove: removeBookmarkNode }
)(FolderActionMenu);
