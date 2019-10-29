import React from "react";
import PropTypes from "prop-types";
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Typography
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import BookmarkIcon from "../BookmarkIcon";
import { actionMenuIds } from "shared/constants";
import { openNewTab } from "shared/lib/browser";

export default function FileListItem(props) {
  const {
    node = {},
    iconSize = 24,
    selected,
    onDragStart,
    onClick,
    onRightClick,
    onActionMenuClick
  } = props;
  const draggable = !!onDragStart;

  function handleActionMenuClick(event) {
    onActionMenuClick(event, node.id, actionMenuIds.fileActionMenuId);
  }

  function handleContextMenu(event) {
    onRightClick(event, node.id, actionMenuIds.fileActionMenuId);
  }

  function handleDoubleClick() {
    openNewTab(node.url);
  }

  function handleDragStart(event) {
    if (onDragStart) {
      onDragStart(event, node.id);
    }
  }

  function handleClick(event) {
    onClick(event, node.id);
  }

  return (
    <ListItem
      button
      style={{ minHeight: "35px" }}
      onContextMenu={handleContextMenu}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onDragStart={handleDragStart}
      draggable={draggable}
      selected={selected}
    >
      <ListItemIcon style={{ minWidth: iconSize, margin: 2 }}>
        <BookmarkIcon url={node.url} size={iconSize} />
      </ListItemIcon>
      <Typography
        variant="body2"
        noWrap
        component="span"
        color={node.regExp ? "primary" : "textPrimary"}
        style={{ marginInlineStart: iconSize }}
      >
        {node.title}
      </Typography>
      <Typography
        variant="body2"
        noWrap
        component="span"
        color={node.regExp ? "secondary" : "textSecondary"}
        style={{
          marginInlineStart: "1em",
          ...(!selected && { display: "none" })
        }}
      >
        {node.url}
      </Typography>
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="more actions"
          aria-controls={`bookmark-action-menu`}
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

FileListItem.propTypes = {
  node: PropTypes.shape({
    title: PropTypes.string,
    url: PropTypes.string
  }).isRequired
};