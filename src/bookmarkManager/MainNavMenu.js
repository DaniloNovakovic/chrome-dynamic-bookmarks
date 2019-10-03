import React from "react";
import { IconButton, Menu, MenuItem, Divider } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

export default function MainNavMenu() {
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
        aria-label="show more"
        aria-controls="organize-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="organize-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} dense>
          Sort by name
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose} dense>
          Add new bookmark
        </MenuItem>
        <MenuItem onClick={handleClose} dense>
          Add new folder
        </MenuItem>
      </Menu>
    </div>
  );
}
