import React from "react";

import { dialogIds } from "@/shared/constants";

import AddBookmarkDialog from "./AddBookmarkDialog";
import AddFolderDialog from "./AddFolderDialog";
import DialogContext from "./DialogContext";
import EditBookmarkDialog from "./EditBookmarkDialog";
import EditFolderDialog from "./EditFolderDialog";

export default function DialogReducer() {
  const {
    openedDialogId,
    openDialog,
    args = {},
  } = React.useContext(DialogContext);

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
      <EditFolderDialog
        open={dialogIds.editFolderDialogId === openedDialogId}
        onClose={handleClose}
        {...args}
      />
    </>
  );
}
