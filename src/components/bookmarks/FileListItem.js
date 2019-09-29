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
  const { node = {}, ...others } = props;

  return (
    <ListItem button {...others}>
      <ListItemIcon className={classes.iconWrapper}>
        <BookmarkIcon url={node.url} size={iconSize} />
      </ListItemIcon>
      <ListItemText
        primary={node.title}
        secondary={node.url}
        secondaryTypographyProps={{ noWrap: true }}
      />
      <ListItemSecondaryAction>
        <FileActionMenu edge="end" nodeId={node.id} />
      </ListItemSecondaryAction>
    </ListItem>
  );
}

FileListItem.propTypes = {
  node: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string
  }).isRequired
};
