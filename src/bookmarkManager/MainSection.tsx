import { Container, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

import {
  ActionMenuContext,
  BookmarkBreadcrumbs,
  BookmarkList,
  getAnchorPosition,
} from "@/shared/components/bookmarks";
import { actionMenuIds } from "@/shared/constants";

const useStyles = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
}));

export default function MainSection({ className }) {
  const classes = useStyles();
  const { openActionMenu } = React.useContext(ActionMenuContext);

  function handleContextMenu(event) {
    openActionMenu(actionMenuIds.addBookmarkNodeActionMenuId, {
      menuProps: getAnchorPosition(event),
    });
    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <Container className={className} onContextMenu={handleContextMenu}>
      <div className={classes.toolbar} />
      <Paper>
        <BookmarkBreadcrumbs />
        <BookmarkList />
      </Paper>
    </Container>
  );
}
