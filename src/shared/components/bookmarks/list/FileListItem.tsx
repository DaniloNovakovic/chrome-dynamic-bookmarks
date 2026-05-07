import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  IconButton,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import React, { useCallback } from "react";

import { actionMenuIds } from "@/shared/constants";
import { openNewTab } from "@/shared/lib/browser";

import BookmarkIcon from "../BookmarkIcon";

function _emptyFunc() {}

export default function FileListItem(props) {
  const {
    node = {},
    iconSize = 24,
    selected,
    onDragStart = _emptyFunc,
    onClick = _emptyFunc,
    onRightClick = _emptyFunc,
    onActionMenuClick = _emptyFunc,
  } = props;
  const draggable = !!onDragStart;
  const nodeId = node.id;

  const handleActionMenuClick = useCallback(
    (event) => onActionMenuClick(event, nodeId, actionMenuIds.fileActionMenuId),
    [nodeId, onActionMenuClick],
  );

  const handleContextMenu = useCallback(
    (event) => onRightClick(event, nodeId, actionMenuIds.fileActionMenuId),
    [nodeId, onRightClick],
  );

  const handleDoubleClick = useCallback(
    () => openNewTab(node.url),
    [node.url, openNewTab],
  );

  const handleDragStart = useCallback(
    (event) => onDragStart(event, nodeId),
    [onDragStart, nodeId],
  );

  const handleClick = useCallback(
    (event) => onClick(event, nodeId),
    [onClick, nodeId],
  );

  return (
    <ListItem
      disablePadding
      secondaryAction={
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
      }
    >
      <ListItemButton
        sx={{
          alignItems: "center",
          gap: 1.5,
          minHeight: "35px",
          paddingRight: 6,
        }}
        onContextMenu={handleContextMenu}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onDragStart={handleDragStart}
        draggable={draggable}
        selected={selected}
      >
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexShrink: 0,
            justifyContent: "center",
            width: iconSize + 4,
          }}
        >
          <BookmarkIcon url={node.url} size={iconSize} />
        </Box>
        <Typography
          variant="body2"
          noWrap
          component="span"
          color={node.regExp ? "primary" : "text.primary"}
          sx={{ minWidth: 0 }}
        >
          {node.title}
        </Typography>
        <Typography
          variant="body2"
          noWrap
          component="span"
          color={node.regExp ? "secondary" : "text.secondary"}
          sx={{
            marginInlineStart: "1em",
            ...(!selected && { display: "none" }),
          }}
        >
          {node.url}
        </Typography>
      </ListItemButton>
    </ListItem>
  );
}
