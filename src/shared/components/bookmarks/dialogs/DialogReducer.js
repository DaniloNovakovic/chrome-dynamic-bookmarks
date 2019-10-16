import React from "react";
import DialogContext from "./DialogContext";
import AddFolderDialog from "./AddFolderDialog";
import { dialogIds } from "shared/constants";
import AddBookmarkDialog from "./AddBookmarkDialog";

export default function DialogReducer() {
  const { openedDialogId, openDialog } = React.useContext(DialogContext);

  function handleClose() {
    openDialog(null);
  }

  return (
    <>
      <AddBookmarkDialog
        open={dialogIds.addBookmarkDialogId === openedDialogId}
        onClose={handleClose}
      />
      <AddFolderDialog
        open={dialogIds.addFolderDialogId === openedDialogId}
        onClose={handleClose}
      />
    </>
  );
}
