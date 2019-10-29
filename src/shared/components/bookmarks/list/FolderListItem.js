import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  Icon,
  IconButton,
  Typography
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { applyFilter, moveBookmarkNode } from "shared/store/actions";
import { actionMenuIds } from "shared/constants";
import { allowDrop } from "shared/lib/dragAndDrop";

export function FolderListItem(props) {
  const {
    node = {},
    applyFilter,
    moveBookmarkNode,
    iconSize = 24,
    selected,
    onDragStart,
    onActionMenuClick,
    onClick,
    onRightClick
  } = props;
  const draggable = !!onDragStart;

  function handleActionMenuClick(event) {
    onActionMenuClick(event, node.id, actionMenuIds.folderActionMenuId);
  }

  function handleContextMenu(event) {
    onRightClick(event, node.id, actionMenuIds.folderActionMenuId);
  }

  function handleDragStart(event) {
    if (onDragStart) {
      onDragStart(event, node.id);
    }
  }

  function handleDrop(event) {
    const fromNodeId = event.dataTransfer.getData("text");
    moveBookmarkNode(fromNodeId, { parentId: node.id });
    event.preventDefault();
  }

  function handleClick(event) {
    onClick(event, node.id);
  }

  function handleDoubleClick() {
    applyFilter({ parentId: node.id });
  }

  return (
    <ListItem
      button
      style={{ minHeight: "35px" }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
      onDragStart={handleDragStart}
      onDragOver={allowDrop}
      onDrop={handleDrop}
      draggable={draggable}
      selected={selected}
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
          onClick={handleActionMenuClick}
          onContextMenu={handleContextMenu}
          color="inherit"
        >
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default connect(
  null,
  { applyFilter, moveBookmarkNode }
)(FolderListItem);

FolderListItem.propTypes = {
  node: PropTypes.shape({
    title: PropTypes.string
  }).isRequired
};
