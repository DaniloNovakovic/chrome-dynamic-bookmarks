import React from "react";
import { connect } from "react-redux";
import { Menu, MenuItem, Divider } from "@material-ui/core";
import { FileActionMenuContext } from "./FileActionMenuContext";
import { removeBookmarkNode } from "shared/store";

export function FileActionMenu(props) {
  const { nodeId, anchorEl, setAnchorEl } = React.useContext(
    FileActionMenuContext
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
      id={`bookmark-action-menu`}
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      variant="menu"
    >
      <MenuItem onClick={handleClose} dense>
        Edit
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
        Copy URL
      </MenuItem>
      <MenuItem onClick={handleClose} dense>
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

export default connect(
  null,
  { removeBookmarkNode }
)(FileActionMenu);
