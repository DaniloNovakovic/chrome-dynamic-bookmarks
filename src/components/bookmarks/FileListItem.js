import React from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import FileActionMenu from "./FileActionMenu";
import { makeStyles } from "@material-ui/styles";
import BookmarkIcon from "./BookmarkIcon";

const iconSize = 24;

const useStyles = makeStyles(theme => ({
  iconWrapper: {
    minWidth: iconSize * 2
  }
}));

export default function FileListItem(props) {
  const classes = useStyles();
  const { bookmark = {} } = props;

  return (
    <ListItem button>
      <ListItemIcon className={classes.iconWrapper}>
        <BookmarkIcon url={bookmark.url} size={iconSize} />
      </ListItemIcon>
      <ListItemText
        primary={bookmark.title}
        secondary={bookmark.url}
        secondaryTypographyProps={{ noWrap: true }}
      />
      <ListItemSecondaryAction>
        <FileActionMenu edge="end" />
      </ListItemSecondaryAction>
    </ListItem>
  );
}

FileListItem.propTypes = {
  bookmark: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string
  }).isRequired
};
