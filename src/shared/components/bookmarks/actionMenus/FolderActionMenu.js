import React from "react";
import { connect } from "react-redux";
import { Menu, MenuItem, Divider } from "@material-ui/core";
import { FolderActionMenuContext } from "./FolderActionMenuContext";
import { removeBookmarkNode } from "shared/store";
import { DialogContext } from "shared/components/bookmarks";
import { dialogIds } from "shared/constants";

export function FolderActionMenu(props) {
  const { nodeId, anchorEl, setAnchorEl } = React.useContext(
    FolderActionMenuContext
  );
  const { openDialog } = React.useContext(DialogContext);

  function handleClose() {
    setAnchorEl(null);
  }

  function handleRemove() {
    props.removeBookmarkNode(nodeId);
    handleClose();
  }

  function handleDialogOpen(dialogId, args = {}) {
    openDialog(dialogId, args);
    handleClose();
  }

  return (
    <Menu
      id={`folder-action-menu`}
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem
        dense
        onClick={() =>
          handleDialogOpen(dialogIds.editFolderDialogId, { nodeId })
        }
      >
        Rename
      </MenuItem>
      <MenuItem onClick={handleRemove} dense>
        Delete
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleClose} dense>
        Cut
      </MenuItem>
      <MenuItem onClick={handleClose} dense>
        Copy
      </MenuItem>
      <MenuItem onClick={handleClose} dense>
        Paste
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleClose} dense>
        Open all bookmarks
      </MenuItem>
      <MenuItem onClick={handleClose} dense>
        Open all in new window
      </MenuItem>
      <MenuItem onClick={handleClose} dense>
        Open all in incognito window
      </MenuItem>
    </Menu>
  );
}

export default connect(
  null,
  { removeBookmarkNode }
)(FolderActionMenu);
