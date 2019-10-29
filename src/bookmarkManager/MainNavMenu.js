import React from "react";
import { IconButton, Menu, MenuItem, Divider } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { DialogContext } from "shared/components/bookmarks";
import { dialogIds } from "shared/constants";

export default function MainNavMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { openDialog } = React.useContext(DialogContext);

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
        <MenuItem
          dense
          onClick={() => {
            openDialog(dialogIds.addBookmarkDialogId);
            handleClose();
          }}
        >
          Add new bookmark
        </MenuItem>
        <MenuItem
          dense
          onClick={() => {
            openDialog(dialogIds.addFolderDialogId);
            handleClose();
          }}
        >
          Add new folder
        </MenuItem>
      </Menu>
    </div>
  );
}
