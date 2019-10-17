import React from "react";
import { Menu, MenuItem } from "@material-ui/core";
import { DialogContext } from "shared/components/bookmarks";
import { dialogIds, actionMenuIds } from "shared/constants";

export default function AddBookmarkNodeActionMenu(props) {
  const { nodeId, open, onClose, onRemove, ...other } = props;
  const { openDialog } = React.useContext(DialogContext);

  function handleClose() {
    onClose();
  }

  function handleDialogOpen(dialogId, args = {}) {
    openDialog(dialogId, args);
    handleClose();
  }

  return (
    <Menu
      id={actionMenuIds.addBookmarkNodeActionMenuId}
      keepMounted
      open={open}
      onClose={handleClose}
      {...other}
    >
      <MenuItem
        dense
        onClick={() => {
          handleDialogOpen(dialogIds.addBookmarkDialogId);
        }}
      >
        Add new bookmark
      </MenuItem>
      <MenuItem
        dense
        onClick={() => {
          handleDialogOpen(dialogIds.addFolderDialogId);
        }}
      >
        Add new folder
      </MenuItem>
    </Menu>
  );
}
