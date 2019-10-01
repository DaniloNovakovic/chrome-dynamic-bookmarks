import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Icon from "@material-ui/core/Icon";
import { applyFilter } from "store/actions/bookmarkNodesActions";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { FolderActionMenuContext } from "./FolderActionMenuContext";
import Typography from "@material-ui/core/Typography";

export function FolderListItem(props) {
  const { setAnchorEl } = React.useContext(FolderActionMenuContext);
  const { node = {}, applyFilter, iconSize = 24, selected, ...others } = props;

  function showActionMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  return (
    <ListItem
      button
      onDoubleClick={() => applyFilter({ parentId: node.id })}
      style={{ minHeight: "35px" }}
      {...others}
    >
      <ListItemIcon style={{ minWidth: iconSize, padding: 1 }}>
        <Icon style={{ fontSize: iconSize + 3 }}>folder</Icon>
      </ListItemIcon>
      <Typography
        variant="body2"
        noWrap
        component="span"
        color="textPrimary"
        style={{ marginInlineStart: iconSize }}
      >
        {node.title}
      </Typography>
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="more actions"
          aria-controls={`folder-action-menu`}
          aria-haspopup="true"
          onClick={showActionMenu}
          color="inherit"
          size="small"
        >
          <MoreVertIcon fontSize="small" />
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
