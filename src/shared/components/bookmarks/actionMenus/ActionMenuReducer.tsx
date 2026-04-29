import React, { useCallback } from "react";

import { actionMenuIds } from "@/shared/constants";

import ActionMenuContext from "./ActionMenuContext";
import AddBookmarkNodeActionMenu from "./AddBookmarkNodeActionMenu";
import FileActionMenu from "./FileActionMenu";
import FolderActionMenu from "./FolderActionMenu";
import SelectedNodesActionMenu from "./SelectedNodesActionMenu";

export default function ActionMenuReducer() {
  const {
    openedActionMenuId,
    openActionMenu,
    args = {},
  } = React.useContext(ActionMenuContext);

  const handleClose = useCallback(() => openActionMenu(null), [openActionMenu]);

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
