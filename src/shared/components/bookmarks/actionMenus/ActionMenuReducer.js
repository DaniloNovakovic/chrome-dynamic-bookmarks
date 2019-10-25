import React from "react";
import ActionMenuContext from "./ActionMenuContext";
import { actionMenuIds } from "shared/constants";
import FileActionMenu from "./FileActionMenu";
import FolderActionMenu from "./FolderActionMenu";
import AddBookmarkNodeActionMenu from "./AddBookmarkNodeActionMenu";
import SelectedNodesActionMenu from "./SelectedNodesActionMenu";

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
      <AddBookmarkNodeActionMenu
        open={actionMenuIds.addBookmarkNodeActionMenuId === openedActionMenuId}
        onClose={handleClose}
        {...args}
      />
      <SelectedNodesActionMenu
        open={actionMenuIds.selectedNodesActionMenuId === openedActionMenuId}
        onClose={handleClose}
        {...args}
      />
    </>
  );
}
