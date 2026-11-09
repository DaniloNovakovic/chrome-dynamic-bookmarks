import { Box, Container, Paper } from "@mui/material";
import React from "react";

import {
  ActionMenuContext,
  BookmarkBreadcrumbs,
  BookmarkList,
  getAnchorPosition,
} from "@/shared/components/bookmarks";
import { actionMenuIds } from "@/shared/constants";

export default function MainSection({ sx }) {
  const { openActionMenu } = React.useContext(ActionMenuContext);

  function handleContextMenu(event) {
    openActionMenu(actionMenuIds.addBookmarkNodeActionMenuId, {
      menuProps: getAnchorPosition(event),
    });
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <Container sx={sx} onContextMenu={handleContextMenu}>
      <Box sx={(theme) => theme.mixins.toolbar} />
      <Paper>
        <BookmarkBreadcrumbs />
        <BookmarkList />
      </Paper>
    </Container>
  );
}
