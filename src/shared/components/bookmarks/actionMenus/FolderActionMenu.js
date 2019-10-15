import React from "react";
import { connect } from "react-redux";
import { Menu, MenuItem, Divider } from "@material-ui/core";
import { FolderActionMenuContext } from "./FolderActionMenuContext";
import { removeBookmarkNode } from "shared/store";

export function FolderActionMenu(props) {
  const { nodeId, anchorEl, setAnchorEl } = React.useContext(
    FolderActionMenuContext
  );

  function handleClose() {
    setAnchorEl(null);
  }

  function handleRemove() {
    props.removeBookmarkNode(nodeId);
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
      <MenuItem onClick={handleClose} dense>
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
