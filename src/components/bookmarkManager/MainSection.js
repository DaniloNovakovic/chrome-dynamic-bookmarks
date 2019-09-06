import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import BookmarkList from "../bookmarks/BookmarkList";

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar
}));

export default function MainSection({ className }) {
  const classes = useStyles();

  return (
    <Container className={className}>
      <div className={classes.toolbar} />
      <Paper>
        <BookmarkList />
      </Paper>
    </Container>
  );
}
