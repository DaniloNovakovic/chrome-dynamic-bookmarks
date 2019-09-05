import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BookmarkTreeView from "../bookmarks/TreeView";

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar
}));

export default function SideNavContent() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.toolbar} />
      <BookmarkTreeView />
    </div>
  );
}
