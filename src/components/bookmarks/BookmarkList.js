import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import FileActionMenu from "./FileActionMenu";
import { makeStyles } from "@material-ui/styles";
import BookmarkIcon from "./BookmarkIcon";

const iconSize = 24;

const useStyles = makeStyles(theme => ({
  bookmarkListItem: {
    minWidth: iconSize * 2
  }
}));

const BookmarkListItem = () => {
  const classes = useStyles();

  const item = {
    title: "Regular Expressions (RegEx) Tutorial #1 - What is RegEx? - YouTube",
    url:
      "https://www.youtube.com/watch?v=r6I-Ahc0HB4&list=PL4cUxeGkcC9g6m_6Sld9Q4jzqdqHd2HiD"
  };

  return (
    <ListItem button>
      <ListItemIcon className={classes.bookmarkListItem}>
        <BookmarkIcon url={item.url} size={iconSize} />
      </ListItemIcon>
      <ListItemText
        primary={item.title}
        secondary={item.url}
        secondaryTypographyProps={{ noWrap: true }}
      />
      <ListItemSecondaryAction>
        <FileActionMenu edge="end" />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default function BookmarkList() {
  return (
    <List aria-label="main bookmark list" dense>
      <BookmarkListItem />
      <BookmarkListItem />
      <BookmarkListItem />
    </List>
  );
}
