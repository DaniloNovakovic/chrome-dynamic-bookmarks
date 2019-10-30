import React, { useCallback } from "react";
import { Menu, MenuItem } from "@material-ui/core";
import { DialogContext } from "shared/components/bookmarks";
import { dialogIds, actionMenuIds } from "shared/constants";

export default function AddBookmarkNodeActionMenu(props) {
  const { open, onClose, menuProps = {} } = props;
  const { openDialog } = React.useContext(DialogContext);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleDialogOpen = useCallback(
    (dialogId, args = {}) => {
      openDialog(dialogId, args);
      handleClose();
    },
    [openDialog, handleClose]
  );

  return (
    <Menu
      id={actionMenuIds.addBookmarkNodeActionMenuId}
      keepMounted
      open={open}
      onClose={handleClose}
      {...menuProps}
    >
      <MenuItem
        dense
        onClick={useCallback(
          () => handleDialogOpen(dialogIds.addBookmarkDialogId),
          [handleDialogOpen]
        )}
      >
        Add new bookmark
      </MenuItem>
      <MenuItem
        dense
        onClick={useCallback(
          () => handleDialogOpen(dialogIds.addFolderDialogId),
          [handleDialogOpen]
        )}
      >
        Add new folder
      </MenuItem>
    </Menu>
  );
}
