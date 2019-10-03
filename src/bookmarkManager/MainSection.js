import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Container } from "@material-ui/core";
import BookmarkList from "shared/components/bookmarks/BookmarkList";
import BookmarkBreadcrumbs from "shared/components/bookmarks/BookmarkBreadcrumbs";

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar
}));

export default function MainSection({ className }) {
  const classes = useStyles();

  return (
    <Container className={className}>
      <div className={classes.toolbar} />
      <Paper>
        <BookmarkBreadcrumbs />
        <BookmarkList />
      </Paper>
    </Container>
  );
}
