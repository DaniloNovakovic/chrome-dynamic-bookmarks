import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import { makeStyles } from "@material-ui/styles";
import FolderIcon from "@material-ui/icons/Folder";
import { applyFilter } from "store/actions/bookmarkNodesActions";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { FolderActionMenuContext } from "./FolderActionMenuContext";

const iconSize = 24;

const useStyles = makeStyles(theme => ({
  iconWrapper: {
    minWidth: iconSize * 2
  }
}));

export function FolderListItem(props) {
  const classes = useStyles();
  const { setAnchorEl } = React.useContext(FolderActionMenuContext);
  const { node = {}, applyFilter, ...others } = props;

  function showActionMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  return (
    <ListItem
      button
      onDoubleClick={() => applyFilter({ parentId: node.id })}
      {...others}
    >
      <ListItemIcon className={classes.iconWrapper}>
        <FolderIcon />
      </ListItemIcon>
      <ListItemText primary={node.title} />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="more actions"
          aria-controls={`folder-action-menu`}
          aria-haspopup="true"
          onClick={showActionMenu}
          color="inherit"
        >
          <MoreVertIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default connect(
  null,
  { applyFilter }
)(FolderListItem);

FolderListItem.propTypes = {
  node: PropTypes.shape({
    title: PropTypes.string
  }).isRequired
};
