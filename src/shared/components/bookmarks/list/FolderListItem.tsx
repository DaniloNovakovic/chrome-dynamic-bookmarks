import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Icon,
  IconButton,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import React, { useCallback } from "react";
import { connect } from "react-redux";

import { actionMenuIds } from "@/shared/constants";
import { allowDrop } from "@/shared/lib/dragAndDrop";
import {
  moveBookmarkNode,
  openFolder,
  trackedByIdSelector,
} from "@/shared/store";

function _emptyFunc() {}

export function FolderListItem(props) {
  const {
    node = {},
    iconSize = 24,
    selected,
    tracked,
    openFolder = _emptyFunc,
    moveBookmarkNode = _emptyFunc,
    onDragStart = _emptyFunc,
    onActionMenuClick = _emptyFunc,
    onClick = _emptyFunc,
    onRightClick = _emptyFunc,
  } = props;
  const draggable = !!onDragStart;
  const nodeId = node.id;

  const handleActionMenuClick = useCallback(
    (event) =>
      onActionMenuClick(event, nodeId, actionMenuIds.folderActionMenuId),
    [onActionMenuClick, nodeId],
  );

  const handleContextMenu = useCallback(
    (event) => onRightClick(event, nodeId, actionMenuIds.folderActionMenuId),
    [onRightClick, nodeId],
  );

  const handleDragStart = useCallback(
    (event) => onDragStart(event, nodeId),
    [onDragStart, nodeId],
  );

  const handleDrop = useCallback(
    (event) => {
      const fromNodeId = event.dataTransfer.getData("text");
      moveBookmarkNode(fromNodeId, { parentId: nodeId });
      event.preventDefault();
    },
    [moveBookmarkNode, nodeId],
  );

  const handleClick = useCallback(
    (event) => onClick(event, nodeId),
    [onClick, nodeId],
  );

  const handleDoubleClick = useCallback(
    () => openFolder(nodeId),
    [openFolder, nodeId],
  );

  return (
    <ListItem
      disablePadding
      secondaryAction={
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
      }
    >
      <ListItemButton
        sx={{
          alignItems: "center",
          gap: 1.5,
          minHeight: "35px",
          paddingRight: 6,
        }}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        onContextMenu={handleContextMenu}
        onDragStart={handleDragStart}
        onDragOver={allowDrop}
        onDrop={handleDrop}
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
          <Icon
            sx={{ fontSize: iconSize + 3 }}
            color={tracked ? "primary" : "inherit"}
          >
            folder
          </Icon>
        </Box>
        <Typography
          variant="body2"
          noWrap
          component="span"
          sx={{ minWidth: 0 }}
        >
          {node.title}
        </Typography>
      </ListItemButton>
    </ListItem>
  );
}

function mapStateToProps(state, { node }) {
  return {
    tracked: node.id in trackedByIdSelector(state),
  };
}

export default connect(mapStateToProps, { openFolder, moveBookmarkNode })(
  FolderListItem,
);
