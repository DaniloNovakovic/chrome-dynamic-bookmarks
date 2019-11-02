import React, { useCallback } from "react";
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

function _emptyFunc() {}

export default function FileListItem(props) {
  const {
    node = {},
    iconSize = 24,
    selected,
    onDragStart = _emptyFunc,
    onClick = _emptyFunc,
    onRightClick = _emptyFunc,
    onActionMenuClick = _emptyFunc
  } = props;
  const draggable = !!onDragStart;
  const nodeId = node.id;

  const handleActionMenuClick = useCallback(
    event => onActionMenuClick(event, nodeId, actionMenuIds.fileActionMenuId),
    [nodeId, onActionMenuClick]
  );

  const handleContextMenu = useCallback(
    event => onRightClick(event, nodeId, actionMenuIds.fileActionMenuId),
    [nodeId, onRightClick]
  );

  const handleDoubleClick = useCallback(() => openNewTab(node.url), [
    node.url,
    openNewTab
  ]);

  const handleDragStart = useCallback(event => onDragStart(event, nodeId), [
    onDragStart,
    nodeId
  ]);

  const handleClick = useCallback(event => onClick(event, nodeId), [
    onClick,
    nodeId
  ]);

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
