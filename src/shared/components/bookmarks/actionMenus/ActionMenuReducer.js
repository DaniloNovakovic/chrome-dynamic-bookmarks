import React from "react";
import ActionMenuContext from "./ActionMenuContext";
import { actionMenuIds } from "shared/constants";
import FileActionMenu from "./FileActionMenu";
import { FolderActionMenu } from "./FolderActionMenu";

export default function ActionMenuReducer() {
  const { openedActionMenuId, openActionMenu, args = {} } = React.useContext(
    ActionMenuContext
  );

  function handleClose() {
    openActionMenu(null);
  }

  return (
    <>
      <FileActionMenu
        open={actionMenuIds.fileActionMenuId === openedActionMenuId}
        onClose={handleClose}
        {...args}
      />
      <FolderActionMenu
        open={actionMenuIds.folderActionMenuId === openedActionMenuId}
        onClose={handleClose}
        {...args}
      />
    </>
  );
}
