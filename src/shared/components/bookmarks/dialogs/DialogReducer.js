import React from "react";
import DialogContext from "./DialogContext";
import AddFolderDialog from "./AddFolderDialog";
import { dialogIds } from "shared/constants";

export default function DialogReducer() {
  const { openedDialogId, openDialog } = React.useContext(DialogContext);
  function handleClose() {
    openDialog(null);
  }
  return (
    <>
      <AddFolderDialog
        open={dialogIds.addFolderDialogId === openedDialogId}
        onClose={handleClose}
      />
    </>
  );
}
