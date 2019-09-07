import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Divider from "@material-ui/core/Divider";

export default function FileActionMenu({ edge = "end" }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <div>
      <IconButton
        edge={edge}
        aria-label="more actions"
        aria-controls="folder-action-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="folder-action-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} dense>
          Rename
        </MenuItem>
        <MenuItem onClick={handleClose} dense>
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
    </div>
  );
}
