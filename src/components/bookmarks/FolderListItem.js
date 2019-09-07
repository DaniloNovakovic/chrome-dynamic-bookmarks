import React from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import FolderActionMenu from "./FolderActionMenu";
import { makeStyles } from "@material-ui/styles";
import FolderIcon from "@material-ui/icons/Folder";

const iconSize = 24;

const useStyles = makeStyles(theme => ({
  iconWrapper: {
    minWidth: iconSize * 2
  }
}));

export default function FolderListItem(props) {
  const classes = useStyles();
  const { bookmark = {} } = props;

  return (
    <ListItem button>
      <ListItemIcon className={classes.iconWrapper}>
        <FolderIcon />
      </ListItemIcon>
      <ListItemText primary={bookmark.title} />
      <ListItemSecondaryAction>
        <FolderActionMenu edge="end" />
      </ListItemSecondaryAction>
    </ListItem>
  );
}

FolderListItem.propTypes = {
  bookmark: PropTypes.shape({
    title: PropTypes.string
  }).isRequired
};
