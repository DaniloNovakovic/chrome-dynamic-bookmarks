import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import InboxIcon from "@material-ui/icons/Inbox";
import FileActionMenu from "./FileActionMenu";

const BookmarkListItem = () => (
  <ListItem button>
    <ListItemIcon>
      <InboxIcon edge="start" />
    </ListItemIcon>
    <ListItemText
      primary="Regular Expressions (RegEx) Tutorial #1 - What is RegEx? - YouTube"
      secondary="https://www.youtube.com/watch?v=r6I-Ahc0HB4&list=PL4cUxeGkcC9g6m_6Sld9Q4jzqdqHd2HiD"
      secondaryTypographyProps={{ noWrap: true }}
    />
    <ListItemSecondaryAction>
      <FileActionMenu edge="end" />
    </ListItemSecondaryAction>
  </ListItem>
);

export default function BookmarkList() {
  return (
    <List aria-label="main bookmark list" dense>
      <BookmarkListItem />
      <BookmarkListItem />
      <BookmarkListItem />
    </List>
  );
}
