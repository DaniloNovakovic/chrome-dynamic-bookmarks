import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Container } from "@material-ui/core";
import { BookmarkList, BookmarkBreadcrumbs } from "shared/components/bookmarks";

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
