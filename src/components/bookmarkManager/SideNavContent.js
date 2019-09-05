import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BookmarkTreeView from "../bookmarks/TreeView";

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  treeView: {
    marginTop: theme.spacing(1),
    height: 216,
    flexGrow: 1,
    maxWidth: 400
  }
}));

export default function SideNavContent() {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.toolbar} />
      <BookmarkTreeView className={classes.treeView} />
    </div>
  );
}
