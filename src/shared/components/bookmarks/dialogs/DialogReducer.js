import React from "react";
import DialogContext from "./DialogContext";
import AddFolderDialog from "./AddFolderDialog";
import { dialogIds } from "shared/constants";
import AddBookmarkDialog from "./AddBookmarkDialog";
import EditBookmarkDialog from "./EditBookmarkDialog";

export default function DialogReducer() {
  const { openedDialogId, openDialog, args = {} } = React.useContext(
    DialogContext
  );

  function handleClose() {
    openDialog(null);
  }

  return (
    <>
      <AddBookmarkDialog
        open={dialogIds.addBookmarkDialogId === openedDialogId}
        onClose={handleClose}
        {...args}
      />
      <AddFolderDialog
        open={dialogIds.addFolderDialogId === openedDialogId}
        onClose={handleClose}
        {...args}
      />
      <EditBookmarkDialog
        open={dialogIds.editBookmarkDialogId === openedDialogId}
        onClose={handleClose}
        {...args}
      />
    </>
  );
}
