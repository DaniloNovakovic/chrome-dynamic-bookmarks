import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import FolderActionMenu from "./FolderActionMenu";
import { makeStyles } from "@material-ui/styles";
import FolderIcon from "@material-ui/icons/Folder";
import { applyFilter } from "store/actions/bookmarkNodesActions";

const iconSize = 24;

const useStyles = makeStyles(theme => ({
  iconWrapper: {
    minWidth: iconSize * 2
  }
}));

export function FolderListItem(props) {
  const classes = useStyles();
  const { bookmark = {}, applyFilter } = props;

  return (
    <ListItem
      button
      onDoubleClick={() => applyFilter({ parentId: bookmark.id })}
    >
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

export default connect(
  null,
  { applyFilter }
)(FolderListItem);

FolderListItem.propTypes = {
  bookmark: PropTypes.shape({
    title: PropTypes.string
  }).isRequired
};
